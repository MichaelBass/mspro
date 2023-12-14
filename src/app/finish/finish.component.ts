import { Component, OnInit, Inject, Input, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { ChartConfiguration  } from 'chart.js';


import domToImage from 'dom-to-image';
import jsPDF from 'jspdf';

// import { ChartDataSets, ChartType, RadialChartOptions } from 'chart.js';
// import { Label } from 'ng2-charts';


import {ActivatedRoute} from "@angular/router";
import { Result} from '../result';
import { ACService } from '../ac.service';
@Component({
  selector: 'app-finish',
  templateUrl: './finish.component.html',
  styleUrls: ['./finish.component.css']
})



export class FinishComponent implements OnInit {
 

		isNaN: Function = Number.isNaN;
		public optionalPROs = 0;


		public greaterThan(num: number) {

			// console.log("what is optionalPROs " + this.optionalPROs);
		  return (this.optionalPROs > num);
		}

 public radarChartOptions: ChartConfiguration<'radar'>['options'] = {
    responsive: true
  };

public radarChartOptions2: ChartConfiguration<'radar'>['options'] = {
    responsive: true
  };

	  public radarChartLabels!: string[];
	  public radarChartLabels2!: string[];

	    public radarChartData: ChartConfiguration<'radar'>['data']['datasets'] = [
	    { data: [50, 50, 50, 50, 50, 50, 50, 50], label: 'Series A'},
	    { data: [10, 10, 10, 10, 10, 10, 10, 10], label: 'Min' },
	    { data: [50, 50, 50, 50, 50, 50, 50, 50], label: 'Mean' },
	    { data: [90, 90, 90, 90, 90, 90, 90, 90], label: 'Max' }
	  ];
	  

	    public radarChartData2: ChartConfiguration<'radar'>['data']['datasets'] = [
	    { data: [50, 50, 50, 50, 50, 50, 50], label: 'Series B' },
	    { data: [10, 10, 10, 10, 10, 10, 10], label: 'Min' },
	    { data: [50, 50, 50, 50, 50, 50, 50], label: 'Mean' },
	    { data: [90, 90, 90, 90, 90, 90, 90], label: 'Max' }
	  ];

  //public radarChartType: ChartType = 'radar';

 	message!: string;

	QOL!: Result;
	Fatigue!: Result;
	Pain!: Result;
	Bladder!: Result;
	Depression!: Result;
	Cognition!: Result;
	Social!: Result;
	Mobility!: Result;


	@Input() results: Result[] = [];
	@ViewChild('dataToExport', { static: false }) public dataToExport!: ElementRef;


  constructor(private acService: ACService, private route: ActivatedRoute) { }

  ngOnInit() {

	var myLabels = new Array();
	var myData = new Array();

	var myLabels2 = new Array();
	var myData2 = new Array();

	var standardPROs = 0;


	let cQOL = this.results.filter((a) => a.Form  === 'MS_PRO_QOL');
	if(cQOL.length == 1){
		this.QOL = cQOL[0];
		if(!isNaN(this.QOL.Theta)){
			myLabels.push('Quality of Life');
			myData.push(this.QOL.Theta);
			standardPROs++;
		}
	}

	let cFatigue = this.results.filter((a) => a.Form  === 'MS_PRO_Fatigue');
	if(cFatigue.length == 1){
		this.Fatigue = cFatigue[0];
		if(!isNaN(this.Fatigue.Theta)){
			myLabels.push('Fatigue');
			myData.push(this.Fatigue.Theta);
			standardPROs++;
		}
	}

	let cPain = this.results.filter((a) => a.Form  === 'MS_PRO_Pain');
	if(cPain.length == 1){
		this.Pain = cPain[0];
		if(!isNaN(this.Pain.Theta)){
			myLabels.push('Pain');
			myData.push(this.Pain.Theta);
			standardPROs++;
		}
	}

	let cBladder = this.results.filter((a) => a.Form  === 'MS_PRO_Bladder');
	if(cBladder.length == 1){
		this.Bladder = cBladder[0];
		if(!isNaN(this.Bladder.Theta)){
			myLabels.push('Bladder');
			myData.push(this.Bladder.Theta);
			standardPROs++;
		}
	}

	let cDepression = this.results.filter((a) => a.Form  === 'MS_PRO_Depression');
	if(cDepression.length == 1){
		this.Depression = cDepression[0];
		if(!isNaN(this.Depression.Theta)){
			myLabels.push('Depression');
			myData.push(this.Depression.Theta);
			standardPROs++;
		}
	}

	let cCognition = this.results.filter((a) => a.Form  === 'MS_PRO_Cognition');
	if(cCognition.length == 1){
		this.Cognition = cCognition[0];
		if(!isNaN(this.Cognition.Theta)){
			myLabels.push('Cognition');
			myData.push(this.Cognition.Theta);
			standardPROs++;
		}
	}

	let cSocial = this.results.filter((a) => a.Form  === 'MS_PRO_SRA');
	if(cSocial.length == 1){
		this.Social = cSocial[0];
		if(!isNaN(this.Social.Theta)){
			myLabels.push('Social');
			myData.push(this.Social.Theta);
			standardPROs++;
		}
	}

	let cMobility = this.results.filter((a) => a.Form  === 'MS_PRO_Mobility');
	if(cMobility.length == 1){
		this.Mobility = cMobility[0];
		if(!isNaN(this.Mobility.Theta)){
			myLabels.push('Mobility');
			myData.push(this.Mobility.Theta);
			standardPROs++;
		}
	}	

	for (let result of this.results) {

	  if(result.Form == 'MS_PRO_Sleep' && !isNaN(result.Theta)){
		myLabels2.push('Sleep');
		myData2.push(result.Theta);
		this.optionalPROs++;
	  }
	  if(result.Form == 'MS_PRO_UpperExtremity' && !isNaN(result.Theta)){
		myLabels2.push('Upper Extremity');
		myData2.push(result.Theta);
		this.optionalPROs++;
	  }
	  if(result.Form == 'MS_PRO_Spasticity' && !isNaN(result.Theta)){
		myLabels2.push('Spasticity');
		myData2.push(result.Theta);
		this.optionalPROs++;
	  }

	  if(result.Form == 'MS_PRO_Anxiety' && !isNaN(result.Theta)){
		myLabels2.push('Anxiety');
		myData2.push(result.Theta);
		this.optionalPROs++;
	  }

	  if(result.Form == 'MS_PRO_SexualFunction' && !isNaN(result.Theta)){
		myLabels2.push('Sexual Function');
		myData2.push(result.Theta);
		this.optionalPROs++;
	  }
	  if(result.Form == 'MS_PRO_Bowel' && !isNaN(result.Theta)){
		myLabels2.push('Bowel');
		myData2.push(result.Theta);
		this.optionalPROs++;
	  }
	  if(result.Form == 'MS_PRO_Vision' && !isNaN(result.Theta)){
		myLabels2.push('Vision');
		myData2.push(result.Theta);
		this.optionalPROs++;
	  }
	}

	this.radarChartLabels = myLabels;
	this.radarChartLabels2 = myLabels2;
	
	this.radarChartData[0].data = myData;
	this.radarChartData[0].label = "Standard Domains";


	var minData = new Array(this.optionalPROs);
	for(var i=0; i < this.optionalPROs; i++){
		minData[i] = 10;
	}

	var maxData = new Array(this.optionalPROs);
	for(var i=0; i < this.optionalPROs; i++){
		maxData[i] = 90;
	}

	var meanData = new Array(this.optionalPROs);
	for(var i=0; i < this.optionalPROs; i++){
		meanData[i] = 50;
	}

	this.radarChartData2[0].data = myData2;
	this.radarChartData2[0].label = "Optional Domains";

	this.radarChartData2[1].data = minData;
	this.radarChartData2[1].label = "Min";

	this.radarChartData2[2].data = meanData;
	this.radarChartData2[2].label = "Mean";

	this.radarChartData2[3].data = maxData;
	this.radarChartData2[3].label = "Max";

  }


  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

	public downloadAsPdf(): void {

		const width = this.dataToExport.nativeElement.clientWidth;
		const height = this.dataToExport.nativeElement.clientHeight + 40;

		let orientation = 'portrait';
		let imageUnit = 'pt';

		if (width > height) {
			orientation = 'landscape';
		} else {
			orientation = 'portrait';
		}


		domToImage.toPng(this.dataToExport.nativeElement, {width: width,height: height}).then(result => 
		{

			let jsPdfOptions = {
				orientation: orientation,
				unit: imageUnit,
				format: [width + 50, height + 220]
			};
		
			// const pdf = new jsPDF(jsPdfOptions);
			const pdf = new jsPDF();
			
			pdf.setFontSize(48);
			pdf.setTextColor('#2585fe');
			// pdf.text(this.pdfName.value ? this.pdfName.value.toUpperCase() : 'Untitled dashboard'.toUpperCase(), 25, 75);
			pdf.text("MS PRO", 25, 75);
			pdf.setFontSize(24);
			pdf.setTextColor('#131523');
			pdf.text('MS PRO Report: ', 25, 115);
			//pdf.addImage(result, 'PNG', 25, 185, width, height);

  		let canvas = <HTMLCanvasElement>document.getElementById('myChartCanvas');
  		if(canvas != null){
				let canvasUrl = canvas.toDataURL("image/jpeg", 0.5);
				//console.log(canvasUrl);


				this.acService.saveImage(canvasUrl).subscribe(
					data => { console.log(data);}
				);



				pdf.addImage(canvas, 'JPEG', 25, 185, width, height);
			}
/*
  		let canvas2 = <HTMLCanvasElement>document.getElementById('myChartCanvas2');
  		if(canvas2 != null){
				let canvasUrl2 = canvas2.toDataURL("image/jpeg", 0.5);
				//console.log(canvasUrl2);
				pdf.addImage(canvasUrl2, 'jpeg"', height + 50, 185, width, height);
			}	
*/
			pdf.save('file_name'+ '.pdf');
					
		}

	).catch(error => { console.log("error occurred in generating pdf")});
	
	}


}
