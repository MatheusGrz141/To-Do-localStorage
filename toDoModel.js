class toDoModel{
    constructor(title , done){
        this.title = title;
        this.done = done;
    }
    set setDone(done){
        this.done = done;
    }
    get getDone(){
        return this.done;
    }
}