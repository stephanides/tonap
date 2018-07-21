export default interface IFile {
  data: string;
  lastModified: number;
  lastModifiedDate: Date;
  name: string;
  preview: string;
  size: number;
  type: string;
  webkitRelativePath: string;
}
