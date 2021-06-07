export interface StudyFilter {
	name: string;
	institution: string;
	patientId: string;
	gender: string;
	studyDescription: string;
	modality: string;
	instances: number;
	studyDateInit: Date;
	studyDateEnd: Date;
}