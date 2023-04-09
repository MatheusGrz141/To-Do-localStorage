let listaTodos =  JSON.parse(localStorage.getItem("salvarToDo")) || []

class Controller{
    constructor(){
        this.container = document.querySelector('#container');
        
  
        this.render();
        
        document.querySelector('#addTodo').addEventListener('click' , (e) => {
            e.preventDefault();
            this.add();
            this.clearInput();
        });   
        this.bind();
       
    } 
  

    render(){
        this.container.innerHTML = '';
        listaTodos.forEach((todo, index) => {
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
        listaTodos.push(new toDoModel(todo , false));
        this.render();
        this.salvarToDo()
       
        
    }
    delete(targetButton){
        let index = targetButton.closest('div').dataset.index;
        targetButton.closest('div').remove();
        listaTodos.splice(index ,1);
        this.render();
        this.salvarToDo()
    }
    check(targetButton){
        let index = targetButton.closest('div').dataset.index;
        listaTodos[index].done = !(listaTodos[index].done);
        this.render(); 
        this.salvarToDo()
    }
    salvarToDo(){
       
        localStorage.setItem('salvarToDo' , JSON.stringify(listaTodos))
        
    }
    clearInput() {
        document.querySelector('#toDOInput').value = '';
    }
}


