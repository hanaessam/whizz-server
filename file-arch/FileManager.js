export class FileManager {
    constructor(fileArch) {
        this.fileArch = fileArch;
        
    }
    
    addFile(file) {
        this.files.push(file);
    }
    
    getFiles() {
        return this.files;
    }
}