
import axios from 'axios';
import React, {Component} from 'react' ;
import { Bar} from 'react-chartjs-2';
import hello from "../../images/hello.svg";
import "../../Styles/Main.css"

class Chart extends React.Component{
  constructor(props){
    super(props)
    
    this.state={
         chartData:{} ,
         isLoading: false,  
         error: null, 
         encaissement:[],
         decaissement:[],
         tresory:[],
         sum_encaisse:0,
         sum_decaisse:0,
      } 
    
    }
getEncaissement=(year)=>{
  let encaisse=`http://127.0.0.1:3333/encaisse/?year=${year}`
  let tresorie=`http://127.0.0.1:3333/tresory/?year=${year}`

    console.log(year,this.state.tresory)
  axios.get(encaisse).then(res => {
    let encaissement=[]
    let decaissement=[]
    let tresory=[]
    let sum_encaisse=0
    let sum_decaisse=0
    for(let i of res.data.tresorie)
    tresory.push(i)
    this.setState({tresory})
    for (let dataObj of res.data.encs) {
      encaissement.push(dataObj.montant)
      sum_encaisse+=parseFloat(dataObj.montant)
    };
    this.setState({sum_encaisse:(sum_encaisse/1000)})
      for (let dataobj of res.data.decs) 
      {decaissement.push(dataobj.montant) 
        sum_decaisse+=parseFloat(dataobj.montant)
      }
      this.setState({sum_decaisse:(sum_decaisse/1000)})

      this.setState({chartData:{     
        labels:["Janvier", "Fevrier", "Mars", "Avril", "Mai", "Juin"
      ,"Juillet","Aout","septembre","octobre","novombre", "decembre"], 
     datasets:[
      {
        label: 'Trésorerie',
        type:'line',
        data:tresory,
          backgroundColor:'Transparent',
          borderColor: '#4DA5E8'

            },
            { label: 'Encaissement',
            data:encaissement,
        
              backgroundColor:'#159605',
              borderWidth: 8,
                              
                },
            {
label: 'Décaissement',
type:'bar',
data:decaissement,
  backgroundColor:'#FF0000',
  borderWidth: 8,
      
    } ,
   
        
    
    
  ]}})
})
      
   
}

   
   

componentDidMount(){
 let date=new Date().getFullYear()
   this.getEncaissement(date)
 
}
handleYear=(e)=> {
    const year= e.target.value
  this.getEncaissement(year)
}

render(){
  const classes = this.props
 
  
return(
<>
<main>
      <div className="main__container">
      

        <div className="main__title">
          <img src={hello} alt="hello" />
          <div className="main__greeting">
            <h1>Hello Code Hut</h1>
            <p>bienvenue à votre tableau de board</p>
          </div>
        </div>

     
        <div className="main__cardds">
          <div className="cardd">
            <i
              className="fa fa-money aria-hidden=true fa-2x text-lightblue"
              aria-hidden="true"></i>
            <div className="cardd_inner">
              <p className="text-primary-p">Trésorerie</p>
              <span className="font-bold text-title">{this.state.tresory[this.state.tresory.length-1]/1000}K</span>
            </div>
          </div>

       

          <div className="cardd">
            <i
              className="fa fa-line-chart fa-2x text-red"
              aria-hidden="true"
            ></i>
            <div className="cardd_inner">
              <p className="text-primary-p">Décaissement</p>
              <span className="font-bold text-title">{this.state.sum_decaisse}K</span>
            </div>
          </div>

          <div className="cardd">
            <i
              className="fa fa-line-chart fa-2x text-green"
              aria-hidden="true"
            ></i>
            <div className="cardd_inner">
              <p className="text-primary-p">Encaissement</p>
              <span className="font-bold text-title">{this.state.sum_encaisse}K</span>
            </div>
          </div>
          <div className="cardd">
            <i
              className="fas fa-lightbulb fa-2x text-yellow"
              aria-hidden="true"
            ></i>
            <div className="cardd_inner">
              <p className="text-primary-p">Estimation </p>
              <span className="font-bold text-title">29.4K</span>
            </div>
          </div>
          
          
        </div>
      
      </div>
    </main>
    <div  className="inline m-5"style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
  <form class="form-inline" >
<label for="years"> veuillez choisir l'année:</label>
<select class="form-control ml-3" id="years" name="years"  onChange={this.handleYear}>
        <option value="2019">2019</option>
        <option value="2020">2020</option>
        <option value="2021" selected>2021</option>
      </select>
      </form>
      </div>
 
    <div className="chart">
   
     <Bar 
      data={this.state.chartData}
      options={{
        responsive: true,
        title: { text: "THICCNESS SCALE", display: true },
        scales: {
          yAxes: [
            {
              ticks: {
                autoSkip: true,
                maxTicksLimit: 10,
                beginAtZero: true
              },
              gridLines: {
                display: false
              }
            }
          ],
          xAxes: [
            {
              gridLines: {
                display: false
              }
            }
          ]
        }
      }}
        
/>
    </div>
    </>
    )
          }

}

export default Chart ;
