import react from "react";
import {Box, Checkbox, FormControlLabel, Palette, SwipeableDrawer, Typography, useTheme} from "@mui/material";
import WindowDimensions from "../../../types/interfaces/WindowDimensions";
import useWindowDimensions from "../../../hooks/useWindowDimensions";
import {Education, Seniority, WorkArrangement, WorkTime} from "../../../types/types/JobEntryTypes";
import {
  categoriesWrapperSX,
  filterCategoryTitleSX,
  filterJobsMenuSX, filterOptionsWrapperSX,
  innerBoxSX,
  menuTitleSX
} from "../styling/FilterJobsMenuSX";
import React from "react";

type FilterJobsMenuParams = {
  isOpen: boolean,
  onOpen: (...args: any[]) => any,
  onClose: (...args: any[]) => any,
  workTime: string[],
  seniorityLevel: string[],
  workArrangement: string[],
  educationLevels: string[],
  setWorkTime: react.Dispatch<react.SetStateAction<string[]>>,
  setSeniorityLevel: react.Dispatch<react.SetStateAction<string[]>>,
  setWorkArrangement: react.Dispatch<react.SetStateAction<string[]>>,
  setEducationLevels: react.Dispatch<react.SetStateAction<string[]>>
}

const workTimes: WorkTime[] = ["20h/week", "30h/week", "40h/week"];
const seniorities: Seniority[] = ["Internship", "Working student", "New grad"];
const workArrangements: WorkArrangement[] = ["Office", "Hybrid", "Remote"];
const educations: Education[] = ["Bachelor", "Master", "PhD"];
const tags: string[] = [".NET", "Agile", "AI/ML", "AWS", "Apache Cassandra", "Apache Spark", "AR/VR", "Azure", "Babel",
  "BDD", "Blockchain", "Cassandra", "CI/CD", "C#", "Cryptography", "Django", "Docker", "Elasticsearch", "Embedded",
  "Express.js", "Flask", "Flutter", "Frontend", "Fullstack", "GCP", "Gatsby", "Go", "GraphQL", "Hadoop", "IoT", "Java",
  "JavaScript", "Jenkins", "Jira", "JWT", "Kanban", "Kerberos", "Kotlin", "LDAP", "Laravel", "Microservices",
  "Microsoft SQL Server", "MongoDB", "MySQL", "Next.js", "Node.js", "NoSQL", "Objective-C", "OAuth", "OpenCV", "Oracle",
  "PHP", "PostgreSQL", "PyTorch", "Python", "RabbitMQ", "React", "React Native", "Redis", "REST API", "Ruby",
  "Ruby on Rails", "SAML", "Scrum", "Sinatra", "SQL", "Spring", "Swift", "TDD", "TensorFlow", "TypeScript", "UI5",
  "Unreal Engine", "Unity", "Xamarin"
];

const FilterJobsMenu = (p: FilterJobsMenuParams) => {
  const wd: WindowDimensions = useWindowDimensions();
  const palette: Palette = useTheme().palette;

  const checkboxesController = (
      array: string[],
      setArray: react.Dispatch<react.SetStateAction<string[]>>,
      value: string
  ) => {
    if (array.includes(value))
      setArray(array.filter(x => x !== value).sort());
    else
      setArray([...array, value].sort());
  }

  return (
      <SwipeableDrawer onOpen={p.onOpen} id={"filter-jobs-menu"} onClose={p.onClose} open={p.isOpen}
              anchor={wd.width <= 1000 ? "bottom" : "right"} sx={filterJobsMenuSX(palette)}>
        <Box id={"inner-box"} sx={innerBoxSX}>
          <Typography id={"menu-title"} variant={"h3"} sx={menuTitleSX(palette)}>Filtering</Typography>
          <Box id={"categories-wrapper"} sx={categoriesWrapperSX}>
            <Box id={"category-item"}>
              <Typography id={"filter-category-title"} sx={filterCategoryTitleSX}>Work time</Typography>
              <Box id={"filter-options-wrapper"} sx={filterOptionsWrapperSX(palette)}>
                {
                  workTimes.map(x => <FormControlLabel
                      control={<Checkbox disableRipple />}
                      label={x}
                      checked={p.workTime.includes(x)}
                      onChange={() => checkboxesController(p.workTime, p.setWorkTime, x)}
                  />)
                }
              </Box>
            </Box>
            <Box id={"category-item"}>
              <Typography id={"filter-category-title"} sx={filterCategoryTitleSX}>Seniority level</Typography>
              <Box id={"filter-options-wrapper"} sx={filterOptionsWrapperSX(palette)}>
                {
                  seniorities.map(x => <FormControlLabel
                      control={<Checkbox disableRipple />}
                      label={x}
                      checked={p.seniorityLevel.includes(x)}
                      onChange={() => checkboxesController(p.seniorityLevel, p.setSeniorityLevel, x)}
                  />)
                }
              </Box>
            </Box>
            <Box id={"category-item"}>
              <Typography id={"filter-category-title"} sx={filterCategoryTitleSX}>Work Arrangement</Typography>
              <Box id={"filter-options-wrapper"} sx={filterOptionsWrapperSX(palette)}>
                {
                  workArrangements.map(x => <FormControlLabel
                      control={<Checkbox disableRipple />}
                      label={x}
                      checked={p.workArrangement.includes(x)}
                      onChange={() => checkboxesController(p.workArrangement, p.setWorkArrangement, x)}
                  />)
                }
              </Box>
            </Box>
            <Box id={"category-item"}>
              <Typography id={"filter-category-title"} sx={filterCategoryTitleSX}>Education</Typography>
              <Box id={"filter-options-wrapper"} sx={filterOptionsWrapperSX(palette)}>
                {
                  educations.map(x => <FormControlLabel
                      control={<Checkbox disableRipple />}
                      label={x}
                      checked={p.educationLevels.includes(x)}
                      onChange={() => checkboxesController(p.educationLevels, p.setEducationLevels, x)}
                  />)
                }
              </Box>
            </Box>
            {/*<AutocompleteCheckboxes options={tags} name={"Tags"} variant={"theme1"}*/}
            {/*    selectedOptions={p.selectedTags} setSelectedOptions={p.setSelectedTags} />*/}
          </Box>
        </Box>
      </SwipeableDrawer>
  );
}

export default FilterJobsMenu;
