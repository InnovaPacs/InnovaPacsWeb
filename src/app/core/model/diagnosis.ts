export interface Diagnosis {
	id: number;
	created: Date;
	creatorId: number;
	studyId: number;
	fileId: number;
	title: string;
	diagnosis: string;
    username: string;
}

export class DiagnosisDto {
	id: number;
	studyId: number;
	fileId: number;
	title: string;
	diagnosis: string;
	custom: boolean;
}