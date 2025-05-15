let title=document.getElementById('title');
let price=document.getElementById('price');
let taxes=document.getElementById('taxes');
let discount=document.getElementById('discount');
let ads=document.getElementById('ads');
let total=document.getElementById('total');
let submit=document.getElementById('submit');
let count=document.getElementById('count');
let category= document.getElementById('category');


let mood='create';
let temp;
let scy;


//function to calculate the total and do some stuff
function getTheTotal(){

    if(price.value !=''){

        let result= (+price.value + +taxes.value + +ads.value) - discount.value;
        total.innerHTML=result;
        total.style.background='green';

    }else{
        total.innerHTML=' ';
        total.style.background='red';

    }

}


// create a product 
let array;
if(localStorage.product != null){
    array=JSON.parse(localStorage.product); // to return it ro orignal type 

}else{
 array = [];
}


submit.onclick=function(){

    let newproduct ={
        title: title.value,
        price:price.value,
        taxes:taxes.value,
        discount:discount.value,
        ads: ads.value,
        total: total.innerHTML, // becouse it small not input 
        count: count.value,
        category: category.value,


    }
   
    if(mood==='create'){
                if(newproduct.count>1){
                    for(let i =0;i<newproduct.count;i++){
                        
                        array.push(newproduct);
                    }
                }else if(newproduct.count ==1){
                    
                    array.push(newproduct);
                }else{

                        //do no thing
                }
    }else{

        array[temp]=newproduct;
        submit.textContent = 'Create';
        mood='create';
        count.style.display='block';

        scroll({

            top:scy,
            behavior:"smooth",
    
        })

    }
   localStorage.setItem('product', JSON.stringify(array));

   clearinput(); // here im calling the function to clear the input after the click 

   showdata(); // to show the data in the web 

   
}



//clear inputs we tha user click the creat button
function clearinput(){

    title.value='';
    price.value='';
    taxes.value='';
    discount.value='';
    ads.value='';
    total.innerHTML='';
    count.value='';
    category.value='';
}


// read or to show the products 
function showdata(){

    let table='';
    for(let i=0; i<array.length;i++){
         table +=    
                    `
    
                            <tr>
                                <td>${i+1}</td>
                                <td>${array[i].title}</td>
                                <td>${array[i].price}</td>
                                <td>${array[i].taxes}</td>
                                <td>${array[i].ads}</td>
                                <td>${array[i].discount}</td>
                                <td>${array[i].category}</td>
                                <td>${array[i].total}</td>
                                <td><button onclick="update(${i})" id="update">update</button> </td>
                                <td><button onclick="deleteSpecificProject(${i})" id="delete">delete</button></td>
                             </tr>
                    `


}

    document.getElementById('tbody').innerHTML=table;
    let btndeletall=document.getElementById('deleteall');
    if(array.length>0){

        btndeletall.innerHTML=`

        <button onclick="DeleteAll()"> Delete All (${array.length})</button>


        `

    }else{

        btndeletall.innerHTML='';

    }


        getTheTotal(); // to make sure the box of the total will be red if the price is empty


}

showdata(); // in this way to make this function to work Immediately and always 



// Delete specific project

function deleteSpecificProject(i){ // we are calling thin function in the delete button which is in the tbody and sending the i which is the index of the product 

    array.splice(i,1);// to delete the element just from the array not fomr the locol sstoraeg
    localStorage.product=JSON.stringify(array); // to delete the product from localStorage or to update the localStorage
    showdata();// to update the table and show the last update without reload the page 

}


//delete all elements button

function DeleteAll(){

    array.splice(0);
    localStorage.product=JSON.stringify(array);
    showdata();
}


//update button function

function update(i){

    title.value=array[i].title;
    price.value=array[i].price;
    taxes.value=array[i].taxes;
    ads.value=array[i].ads;
    discount.value=array[i].discount;
    category.value=array[i].category;
    count.style.display='none'
    getTheTotal();
    submit.textContent = 'Update';
    mood='update'
    temp=i;
    scy=scrollY;
    scroll({

        top:0,
        behavior:"smooth",

    })

}



// search 


let SearchMood='title';

function GetSearchMood(id){
   

    let search=document.getElementById('search');
   
        if(id =='searchTitle'){
            
            SearchMood='title';
            search.placeholder='Search By Title';
            
        }else{

            SearchMood='catagory';
            search.placeholder='Search By Catagory';

        }
   
         search.focus();
       

}


function Search(value){// we are gettin the value from the HTML search input (this.value)

    let table='';
    for(let i=0;i<array.length;i++){
       
        if(SearchMood=='title'){
                    if(array[i].title.includes(value)){

                        table +=    
                        `
        
                                <tr>
                                    <td>${i}</td>
                                    <td>${array[i].title}</td>
                                    <td>${array[i].price}</td>
                                    <td>${array[i].taxes}</td>
                                    <td>${array[i].ads}</td>
                                    <td>${array[i].discount}</td>
                                    <td>${array[i].category}</td>
                                    <td>${array[i].total}</td>
                                    <td><button onclick="update(${i})" id="update">update</button> </td>
                                    <td><button onclick="deleteSpecificProject(${i})" id="delete">delete</button></td>
                                </tr>
                        `

                    }


            

        }else{
          
                if(array[i].category.includes(value)){

                    table +=    
                    `
    
                            <tr>
                                <td>${i}</td>
                                <td>${array[i].title}</td>
                                <td>${array[i].price}</td>
                                <td>${array[i].taxes}</td>
                                <td>${array[i].ads}</td>
                                <td>${array[i].discount}</td>
                                <td>${array[i].category}</td>
                                <td>${array[i].total}</td>
                                <td><button onclick="update(${i})" id="update">update</button> </td>
                                <td><button onclick="deleteSpecificProject(${i})" id="delete">delete</button></td>
                             </tr>
                    `

                }


        }

    }

        document.getElementById('tbody').innerHTML=table;
}
