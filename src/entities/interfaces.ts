
export interface Organization {
  id: number,
  contactId: number,
  name: string,
  shortName: string,
  businessEntity: string,
  contract: { no: number, issue_date: Date },
  type: [],
  status: string,
  photos: [],
}

export interface OrganizationInfo {
  name?: string,
  shortName?: string,
  businessEntity?: string,
  contract?: { no: string, issue_date: string },
  type?: [],
}

export interface Contact {
  id?: number,
  lastname?: string,
  firstname?: string,
  patronymic?: string,
  phone?: string,
  email?: string,
}

export interface Photo {
  name: string,
  filepath: string,
  thumbpath: string,
}
