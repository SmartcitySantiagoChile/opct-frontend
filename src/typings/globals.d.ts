export interface ChangeOPRequest {
  title: string;
  related_routes: Array<string>;
  related_requests: Array<string | number>;
  reason: string;
}

export interface SelectOption {
  value: string | null;
  label: string;
}

export interface OperationProgramOption extends SelectOption {
  release: string;
}

export interface OrganizationOption extends SelectOption {
  contractType: string;
}

export interface File {
  raw: string;
  name: string;
}

export interface MessageData {
  message: string;
  files: Array<File>;
}
