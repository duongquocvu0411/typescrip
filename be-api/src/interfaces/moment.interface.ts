export interface MomentDTO {
  description: string;
   image: Express.Multer.File;
}

export interface MomentCreateDTO extends MomentDTO {
  image: Express.Multer.File;
}