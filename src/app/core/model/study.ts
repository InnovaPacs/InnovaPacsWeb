export interface Study {
   pk : number;
   createdTime: Date;
   studyDate :  string;
   studyId :  string;
   studyIuid :  string;
   patientFk : number;
   description: string;
   modality: string;
}