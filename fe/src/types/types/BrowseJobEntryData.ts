export type BrowseJobEntryData = {
  id: string,
  ownerUsername: string,
  companyName: string,
  title: string,
  location: string,
  description: string,
  salary: number[] | null,
  salaryCurrency: string | null,
  tags: string[]
}
