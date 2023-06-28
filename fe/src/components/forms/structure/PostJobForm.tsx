import react, {useContext} from "react";
import {useEffect, useState} from "react";
import {
  Autocomplete, AutocompleteRenderInputParams,
  Box,
  Checkbox, CircularProgress, FormControlLabel,
  Palette,
  Slider, TextField,
  Typography,
  useTheme
} from "@mui/material";
import uuid from "react-uuid";
import StyledTextField from "../../inputs/structure/StyledTextField";
import StyledRadioGroup from "../../inputs/structure/StyledRadioGroup";
import React from "react";
import {Education, Seniority, WorkArrangement, WorkTime} from "../../../types/types/JobEntryTypes";
import {
  jobDescriptionSX,
  jobDetailsWrapperSX,
  postJobButtonSX,
  postJobFormSX,
  dynamicListBoxSX,
  titleLocationWrapperSX,
  compensationWrapperSX,
  salaryWrapperSX,
  salaryInfoWrapperSX,
  salaryDisplaySX,
  companyNameSX,
  companyLogoSX, jobLocationSX
} from "../styling/PostJobFormSX";
import {PostJobFVE} from "../../../types/types/FormValidationErrorTypes";
import FormValidationService from "../../../services/FormValidationService";
import PostJobFormDivider from "../../dividers/structure/PostJobFormDivider";
import StyledSelect from "../../inputs/structure/StyledSelect";
import PostJobFormSalaryTooltip from "../../tooltips/structure/PostJobFormSalaryTooltip";
import {currencies} from "../../../data/currencies";
import {DynamicListItemType} from "../../../types/types/DynamicListItemType";
import DynamicList from "../../inputs/structure/DynamicList/DynamicList";
import AutocompleteCheckboxes from "../../inputs/structure/AutocompleteCheckboxes";
import {UserData} from "../../../types/types/UserData";
import CompanyDataService from "../../../services/CompanyDataService";
import {LoadingButton} from "@mui/lab";
import JobEntryService from "../../../services/JobEntryService";
import {AxiosError} from "axios";
import {GlobalAlertType} from "../../../types/types/GlobalAlertType";
import GlobalAlertContext from "../../../contexts/GlobalAlertContext";
import {JobEntryData} from "../../../types/types/JobEntryData";
import {locations, tags} from "../../../resources/Constants";
import {NavigateFunction, useNavigate} from "react-router-dom";

type PostJobFormParams = {
  userDetails: UserData,
  jobEntryId?: string     // Present if the recruiter wants to update an existing job
}

const PostJobForm = (p: PostJobFormParams) => {
  const palette: Palette = useTheme().palette;
  const [disableForm, setDisableForm] = useState<boolean>(false);
  const [postJobFV, setPostJobFV] = useState<PostJobFVE>({
    jobTitle: null,
    jobLocation: null,
    link: null,
    workArrangement: null,
    workTime: null,
    seniority: null,
    education: null,
    description: null,
    responsibilities: null,
    requiredSkills: null,
    preferredSkills: null,
  });
  const globalAlertContext: react.Dispatch<GlobalAlertType> = useContext(GlobalAlertContext)!;
  const nav: NavigateFunction = useNavigate();

  // Display a circular progress when loading job data
  const [loadingCircle, setLoadingCircle] = useState<boolean>(false);

  // Details
  const [jobTitle, setJobTitle] = useState<string>("");
  const [jobLocation, setJobLocation] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [link, setLink] = useState<string>("");

  const [workArrangement, setWorkArrangement] = useState<WorkArrangement | null>(null);
  const [workTime, setWorkTime] = useState<WorkTime | null>(null);
  const [seniority, setSeniority] = useState<Seniority | null>(null);
  const [education, setEducation] = useState<Education | null>(null);

  // Requirements
  const [responsibilities, setResponsibilities] = useState<DynamicListItemType[]>([]);
  const [requiredSkills, setRequiredSkills] = useState<DynamicListItemType[]>([]);
  const [preferredSkills, setPreferredSkills] = useState<DynamicListItemType[]>([]);

  // Tags
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // Compensation
  const [benefits, setBenefits] = useState<DynamicListItemType[]>([]);
  const [includeSalaryData, setIncludeSalaryData] = useState<boolean>(false);
  const [salarySliderStepSize, setSalarySliderStepSize] = useState<number>(100);
  const [salary, setSalary] = useState<number[]>([0, 400000]);
  const [salaryBoundaries, setSalaryBoundaries] = useState<number[]>([0, 400000]);
  const [currency, setCurrency] = useState<string>("EUR");
  const [prevCurrency, setPrevCurrency] = useState<string>("EUR");

  const handleIncludeSalaryDataChange = (event: react.ChangeEvent<HTMLInputElement>) =>
      setIncludeSalaryData(event.target.checked);

  const handleSalaryChange = (event: Event, newValue: number | number[], activeThumb: number,) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      setSalary([Math.min(newValue[0], salary[1]), salary[1]]);
    } else {
      setSalary([salary[0], Math.max(newValue[1], salary[0])]);
    }
  };

  const formatSalary = (salary: number[], salaryCurrency: string): string => {
    const cs: string = currencies.find(x => x.ISO === salaryCurrency)!.symbol;    // currency symbol
    const options: Intl.NumberFormatOptions = {
      style: "decimal",
      minimumFractionDigits: 0
    }
    return `${cs} ${salary[0].toLocaleString("en-US", options)} - ${cs} ${salary[1].toLocaleString("en-US", options)}`;
  }

  const handleOnChangeLocation = (ev: react.SyntheticEvent, value: string | null) => setJobLocation(value ?? "");

  useEffect(() => {
    const exchangeQuantifier: number =
        currencies.find(x => x.ISO === currency)!.exchange / currencies.find(x => x.ISO === prevCurrency)!.exchange;
    const newSalaryBoundaries: number[] = salaryBoundaries.map(x => Math.round(x * exchangeQuantifier));
    setSalaryBoundaries(newSalaryBoundaries);
    setSalary(newSalaryBoundaries);                                           // resetting the salary to [0, max_salary]
    setSalarySliderStepSize(Math.round(salarySliderStepSize * exchangeQuantifier));       // resetting the salary step size
    setPrevCurrency(currency);
  }, [currency]);

  const formValidatorSketch = {
    fv: postJobFV,
    setFV: setPostJobFV
  }

  const descriptionOnChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setPostJobFV({...postJobFV, description: null});
    setDescription(e.target.value);
  }

  const handlePostJob = async () => {
    setDisableForm(true);
    const formStatus: PostJobFVE = FormValidationService.getPostJobFormErrors(jobTitle, jobLocation, link,
        workArrangement, workTime, seniority, education, description, responsibilities.map(x => x.text),
        requiredSkills.map(x => x.text), preferredSkills.map(x => x.text));
    setPostJobFV(formStatus);
    if (Object.values(formStatus).every((v) => v === null || undefined)) {
      const jobEntry: JobEntryData = {
        ownerUsername: p.userDetails.username,
        companyName: p.userDetails.company!,
        title: jobTitle,
        location: jobLocation,
        description: description,
        link: link,
        workArrangement: workArrangement!,
        workTime: workTime!,
        seniority: seniority!,
        education: education!,
        responsibilities: responsibilities.map(x => x.text),
        requiredSkills: requiredSkills.map(x => x.text),
        preferredSkills: preferredSkills.map(x => x.text),
        benefits: benefits.map(x => x.text),
        salary: includeSalaryData ? salary : null,
        salaryCurrency: includeSalaryData ? currency : null,
        tags: selectedTags
      }
      let response;
      if (p.jobEntryId) {
        jobEntry.id = p.jobEntryId;
        try {
          response = await JobEntryService.putJob(jobEntry);
          globalAlertContext({
            severity: "success",
            title: "Success",
            message: `Job updated successfully`,
            open: true
          } as GlobalAlertType);
          clearForm();
          nav(`/browse?id=${jobEntry.id}`);
        } catch (e: any) {
          if (e instanceof AxiosError) {
            globalAlertContext({
              severity: "error",
              title: e.code,
              message: e.response!.data.substring(4),
              open: true
            } as GlobalAlertType);
          }
        }
      } else {
        try {
          response = await JobEntryService.postJob(jobEntry);
          globalAlertContext({
            severity: "success",
            title: "Success",
            message: `Job posted successfully`,
            open: true
          } as GlobalAlertType);
          clearForm();
          nav(`/browse?id=${response.data.id}`);
        } catch (e: any) {
          globalAlertContext({
            severity: "error",
            title: e.code,
            message: e.response!.data.substring(4),
            open: true
          } as GlobalAlertType);
        }
      }
    }
    setDisableForm(false);
  }

  useEffect(() => {
    const runAsync = async () => {
      if (p.jobEntryId) {
        try {
          setLoadingCircle(true);
          setDisableForm(true);
          const jobEntryData: JobEntryData = await JobEntryService.getJobById(p.jobEntryId);
          setJobTitle(jobEntryData.title);
          setJobLocation(jobEntryData.location);
          setWorkArrangement(jobEntryData.workArrangement);
          setWorkTime(jobEntryData.workTime);
          setSeniority(jobEntryData.seniority);
          setEducation(jobEntryData.education);
          setDescription(jobEntryData.description);
          setLink(jobEntryData.link);
          setResponsibilities(jobEntryData.responsibilities.map(
              x => ({
                uuid: uuid(),
                text: x
              } as DynamicListItemType)
          ));
          setRequiredSkills(jobEntryData.requiredSkills.map(
              x => ({
                uuid: uuid(),
                text: x
              } as DynamicListItemType)
          ));
          setPreferredSkills(jobEntryData.preferredSkills.map(
              x => ({
                uuid: uuid(),
                text: x
              } as DynamicListItemType)
          ));
          setSelectedTags(jobEntryData.tags);
          setBenefits(jobEntryData.benefits.map(
              x => ({
                uuid: uuid(),
                text: x
              } as DynamicListItemType)
          ));
          setIncludeSalaryData(Boolean(jobEntryData.salary));
          if (Boolean(jobEntryData.salary)) {
            setSalary(jobEntryData.salary!);
            setCurrency(jobEntryData.salaryCurrency!);
          }
          setDisableForm(false);
          setLoadingCircle(false);
        } catch (e: any) {
          if (e instanceof AxiosError) {
            globalAlertContext({
              severity: "error",
              title: e.code!,
              message: e.message,
              open: true
            } as GlobalAlertType)
          }
          setDisableForm(false);
          setLoadingCircle(false);
          nav("/post-job");
        }
      }
    }

    runAsync();
  }, []);

  const clearForm = () => {
    setJobTitle("");
    setJobLocation("");
    setDescription("");
    setLink("");
    setWorkArrangement(null);
    setWorkTime(null);
    setSeniority(null);
    setEducation(null);
    setDescription("");
    setResponsibilities([]);
    setRequiredSkills([]);
    setPreferredSkills([]);
    setSelectedTags([]);
    setBenefits([]);
    setIncludeSalaryData(false);
    setCurrency("EUR");
    setSalary([0, 400000]);
  }

  return (
    <Box id={"post-job-form"} sx={postJobFormSX}>
      <img src={CompanyDataService.getCompanyImageURL(p.userDetails.company!, "L")}
           alt={"cannot load image"} style={companyLogoSX} />
      <Typography variant={"h3"} sx={companyNameSX}>{p.userDetails.company!}</Typography>
      {
        loadingCircle ? <CircularProgress /> : <></>
      }
      <PostJobFormDivider text={"Details"} />
      <Box id={"title-location-wrapper"} sx={titleLocationWrapperSX}>
        <StyledTextField id={"job-title"} placeHolder={"Job title"} value={jobTitle} setValue={setJobTitle}
          formValidator={{...formValidatorSketch, field: "jobTitle"}} disabled={disableForm}
        />
        <Autocomplete
            freeSolo={false}
            autoHighlight
            fullWidth
            size={"small"}
            value={jobLocation}
            onChange={handleOnChangeLocation}
            renderInput={(params: AutocompleteRenderInputParams) =>
              <TextField
                  {...params}
                  fullWidth
                  placeholder={"Job location"}
                  size={"small"}
                  type={"text"}
                  sx={jobLocationSX(palette)}
              />
            }
            options={locations} />
      </Box>
      <StyledTextField id={"job-link"} value={link} setValue={setLink} placeHolder={"https://external-link-to-your-job"}
        formValidator={{...formValidatorSketch, field: "link"}} disabled={disableForm}
      />
      <Box id={"job-details-wrapper"} sx={jobDetailsWrapperSX}>
        <StyledRadioGroup
            required={true}
            groupTitle={"Work arrangement"}
            options={["Office", "Hybrid", "Remote"]}
            setSelectedValue={setWorkArrangement}
            value={workArrangement}
            formValidator={{...formValidatorSketch, field: "workArrangement"}}
            disabled={disableForm}
        />
        <StyledRadioGroup
            required={true}
            groupTitle={"Work time"}
            options={["20h/week", "30h/week", "40h/week"]}
            setSelectedValue={setWorkTime}
            value={workTime}
            formValidator={{...formValidatorSketch, field: "workTime"}}
            disabled={disableForm}
        />
        <StyledRadioGroup
            required={true}
            groupTitle={"Seniority"}
            options={["Internship", "Working student", "New grad"]}
            setSelectedValue={setSeniority}
            value={seniority}
            formValidator={{...formValidatorSketch, field: "seniority"}}
            disabled={disableForm}
        />
        <StyledRadioGroup
            required={true}
            groupTitle={"Education"}
            options={["Bachelor", "Master", "PhD"]}
            setSelectedValue={setEducation}
            value={education}
            formValidator={{...formValidatorSketch, field: "education"}}
            disabled={disableForm}
        />
      </Box>
      <TextField id={"report-description"} variant={"outlined"} label={"Description"} required multiline rows={5}
        error={Boolean(postJobFV.description)} helperText={postJobFV.description} value={description}
        onChange={descriptionOnChange} sx={jobDescriptionSX(palette)} disabled={disableForm}
      />
      <PostJobFormDivider text={"Requirements"} />
      <Box id={"responsibilities"} sx={dynamicListBoxSX(palette)}>
        <Typography variant={"h3"}>Responsibilities *</Typography>
        <DynamicList data={responsibilities} setData={setResponsibilities} placeholder={"Type a responsibility..."}/>
      </Box>
      <Box id={"required-skills"} sx={dynamicListBoxSX(palette)}>
        <Typography variant={"h3"}>Required skills *</Typography>
        <DynamicList data={requiredSkills} setData={setRequiredSkills} placeholder={"Type a skill..."} />
      </Box>
      <Box id={"preferred-skills"} sx={dynamicListBoxSX(palette)}>
        <Typography variant={"h3"}>Preferred skills</Typography>
        <DynamicList data={preferredSkills} setData={setPreferredSkills} placeholder={"Type a skill..."} />
      </Box>
      <PostJobFormDivider text={"Tags"} />
      <AutocompleteCheckboxes name={"Tags"} options={tags} variant={"theme2"}
          selectedOptions={selectedTags} setSelectedOptions={setSelectedTags} />
      <PostJobFormDivider text={"Compensation"} />
      <Box id={"benefits"} sx={dynamicListBoxSX(palette)}>
        <Typography variant={"h3"}>Benefits</Typography>
        <DynamicList data={benefits} setData={setBenefits} placeholder={"Type a benefit..."} />
      </Box>
      <Box id={"salary"} sx={salaryWrapperSX(palette)} >
        <Box id={"salary-info"} sx={salaryInfoWrapperSX}>
          <Typography variant={"h3"}>Salary</Typography>
          <PostJobFormSalaryTooltip />
        </Box>
        <FormControlLabel id={"include-salary-data"} label={"Include salary data"}
            control={
              <Checkbox checked={includeSalaryData} onChange={handleIncludeSalaryDataChange} disabled={disableForm} />
            }
        />
        {
          includeSalaryData ? <Box id={"salary-input-wrapper"}>
              <Slider
                  aria-label="Restricted values"
                  step={salarySliderStepSize}
                  min={salaryBoundaries[0]}
                  max={salaryBoundaries[1]}
                  onChange={handleSalaryChange}
                  disableSwap
                  value={salary}
                  valueLabelDisplay="off"
                  disabled={disableForm}
              />
              <Box id={"compensation-wrapper"} sx={compensationWrapperSX}>
                <Typography id={"salary-display"} variant={"body2"} sx={salaryDisplaySX} >
                  { formatSalary(salary, currency) }
                </Typography>
                <StyledSelect values={currencies.map(x => x.ISO)} selectedValue={currency}
                  setSelectedValue={setCurrency} disabled={disableForm} />
              </Box>
            </Box> : <></>
        }
      </Box>
      <PostJobFormDivider text={""} />
      <LoadingButton fullWidth variant={"contained"} sx={postJobButtonSX(palette)} onClick={handlePostJob} loading={disableForm}
        disabled={jobTitle === "" || jobLocation === "" || !workArrangement || !workTime || !seniority || !education ||
          description === "" || responsibilities.length === 0 || requiredSkills.length === 0 || disableForm}>
        Post job
      </LoadingButton>
    </Box>
  );
};

export default PostJobForm;
