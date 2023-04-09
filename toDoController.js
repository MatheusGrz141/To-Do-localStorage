

class Controller{
    constructor(){
        this.container = document.querySelector('#container');
        this.listaTodos = [];
        this.listaTodos = JSON.parse(localStorage.getItem("salvarToDo"));
        this.render();
        document.querySelector('#addTodo').addEventListener('click' , (e) => {
            e.preventDefault();
            this.add();
        });   
  
    } 
    render(){
        this.container.innerHTML = '';
        this.listaTodos.forEach((todo, index) => {
            this.container.innerHTML += new TodoView(todo, index).template();
        });
        this.bind();
        
    }
    bind(){
        document.querySelectorAll('.btnDelete').forEach((btn) => {
            btn.addEventListener('click' , (e) => {
                this.delete(e.target);
            });
        });
        
        document.querySelectorAll('.btnCheck').forEach(btn =>{
            btn.addEventListener('click', (e) =>{
                this.check(e.target);
            })
        })
    }
    
    add(){
        const todo = document.querySelector('#toDOInput').value;
        this.listaTodos.push(new toDoModel(todo , false));
        this.render();
        localStorage.setItem('salvarToDo' , JSON.stringify(this.listaTodos))
        console.log(localStorage.salvarToDo)
        
    }
    delete(targetButton){
        let index = targetButton.closest('div').dataset.index;
        targetButton.closest('div').remove();
        this.listaTodos.splice(index ,1);
        this.render();
        
    }
    check(targetButton){
        let index = targetButton.closest('div').dataset.index;
        this.listaTodos[index].setDone = !(this.listaTodos[index].getDone);
        this.render(); 
        
    }

    
}


