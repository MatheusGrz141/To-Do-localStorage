let listaTodos =  JSON.parse(localStorage.getItem("salvarToDo")) || []
let listCompleted = []
class Controller{
    constructor(){
        this.container = document.querySelector('#container');
        
        
        this.render();
        
        document.querySelector('#toggleMode').addEventListener('click' , (e) => {
            this.toggleMode()
        }); 
        
        document.querySelector('#clearCompleted').addEventListener('click' , (e) => {
            this.clearCompleted()
        });   
        
        document.querySelector('#showCompleted').addEventListener('click' , (e) => {
            this.showCompleted()
        });
        
        document.querySelector('#showActive').addEventListener('click' , (e) => {
            this.showActive()
        }); 
        document.querySelector('#all').addEventListener('click' , (e) => {
            this.render()
        }); 
        document.querySelector("#toDOInput").addEventListener('keydown', (e)=>{
            if (e.key === 'Enter') {
                this.add();
            }
        });
        
    } 
    
    qtd(){
        this.Qtd = 0 
        for(let i =0 ;i<listaTodos.length;i++){
            
            if(listaTodos[i].done==false){
                this.Qtd++; 
                
            }
        };
        
        document.querySelector('#qtd').innerHTML = this.Qtd+" items left";
        
    }
    render(){
        this.container.innerHTML = '';
        listaTodos.forEach((todo, index) => {
            
            this.container.innerHTML += new TodoView(todo, index).template();
        });
        
        this.bind();
        this.qtd()
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
        this.clearInput()
        
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
        this.salvarToDo() ;
        
        
    }
    salvarToDo(){
        this.qtd()
        localStorage.setItem('salvarToDo' , JSON.stringify(listaTodos))
        
    }
    
    clearCompleted(){
        
        for(let i =0;i<listaTodos.length ;i++) {
            if(listaTodos[i].done == true){
                listaTodos.splice(i ,1);
                this.clearCompleted()
            }
        }
        this.salvarToDo()
        this.render()
        
    }
    showCompleted(){
        listCompleted = []
        this.container.innerHTML = ''
        
        for(let i =0;i<listaTodos.length ;i++) {
            if(listaTodos[i].done == true){
                listCompleted.push(listaTodos[i])
            }
        }
        
        this.container.innerHTML = '';
        listCompleted.forEach((todo, index) => {
            this.container.innerHTML += new TodoView(todo, index).template();
        });
        
        this.bind();
    }
    showActive(){
        listCompleted = []
        this.container.innerHTML = ''
        
        for(let i =0;i<listaTodos.length ;i++) {
            if(listaTodos[i].done == false){
                listCompleted.push(listaTodos[i])
            }
        }
        
        this.container.innerHTML = '';
        listCompleted.forEach((todo, index) => {
            this.container.innerHTML += new TodoView(todo, index).template();
        });
        this.qtd()
        this.bind();
    }
    
    
    
    clearInput() {
        document.querySelector('#toDOInput').value = '';
    }
    toggleMode() {
        const html = document.documentElement
        html.classList.toggle("light");
        
        
        let img = document.querySelector("#toggleMode")
        if(html.classList.contains('light')){
            img.setAttribute('src' , './images/icon-moon.svg')
        }else{
            img.setAttribute('src' , './images/icon-sun.svg')
        }
        
        
        
    }
}


