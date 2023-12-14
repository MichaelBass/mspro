import { Component, OnInit, Inject } from '@angular/core';
import {Router} from "@angular/router";
import { Observable } from 'rxjs';
import { ACService } from '../ac.service';
import { Item } from '../item';
import { Map } from '../map';
import { Response } from '../response';
import { Battery } from '../battery';
import { Form } from '../form';
import { Result} from '../result';

@Component({
  selector: 'app-assessment',
  templateUrl: './assessment.component.html',
  styleUrls: ['./assessment.component.css']
})
export class AssessmentComponent implements OnInit {

	selectedMap!: Map;
	cumulativeResponses: string = "";
	batteries!: Battery[];
	FormOID!: string;
	form!: Form ;
	batteryIndex!: number;
	results: Result[] = [];

	constructor(private acService: ACService, private router: Router) { }

	ngOnInit() {
		this.acService.getBatteryForms().subscribe(
			data => {
				this.batteries = data;
				this.batteryIndex = 0;
				this.FormOID = this.batteries[this.batteryIndex].FormOID;
				this.acService.getNextItemSync(this.FormOID, this.cumulativeResponses).subscribe(
					data => { 
						this.form = data;
					}
				);
			}
		);
	}

	onSelect(map: Map): void {
		this.selectedMap = map;
		this.onSubmit();
	}

	onSubmit(): void {
		let data = this.form.Items[0].ID + "=" + this.selectedMap.Description + "&";
		this.cumulativeResponses = this.cumulativeResponses + data;

		this.acService.getNextItemSync(this.FormOID, this.cumulativeResponses).subscribe(
			data => { 
				this.form = data;
				if (this.form.Items.length == 0){
					//call Scores endpoint
					this.onScoreForm();
					//this.onNextForm();
				}
			}
		);
	}

	onScoreForm(): void {
		if(this.FormOID == "D711C5BB-3BF1-49E9-8E21-97C36A13E5C1"){
				let _result = new Result();
				_result.Form = this.batteries[this.batteryIndex].Name;
				_result.Theta = NaN;
				_result.StdError = NaN;
				this.results.push(_result);
				this.onNextForm();
		}else{
			this.acService.getScore(this.FormOID, this.cumulativeResponses).subscribe(
			data2 => { 
				let _result = new Result();
				_result.Form = this.batteries[this.batteryIndex].Name;
				_result.Theta = Math.round( parseFloat(data2.Form[0].Theta) *10.0 + 50.0 );
				_result.StdError = Math.round( parseFloat(data2.Form[0].StdError) * 10.0);
				this.results.push(_result);
				this.onNextForm();
			});
		}

	}

	onNextForm(): void{
		if(this.batteryIndex != this.batteries.length - 1){
			this.batteryIndex = this.batteryIndex + 1;
			this.FormOID = this.batteries[this.batteryIndex].FormOID;
			this.cumulativeResponses = "";

/*
			//MS_PRO_Sleep
			if(this.FormOID =="9495CD93-0AA5-493E-ACD7-4F9626535642"){
				this.cumulativeResponses = "Sleep_AdditionalConcerns=Yes&";
			}
			//MS_PRO_UpperExtremity
			if(this.FormOID =="2D1786F3-19A1-42E1-BB1A-1E7B00DA5D3B"){
				this.cumulativeResponses = "UpperExtremity_Additional=Yes&";
			}
			//MS_PRO_Spasticity
			if(this.FormOID =="D711C5BB-3BF1-49E9-8E21-97C36A13E5C1"){
				this.cumulativeResponses = "Spasticity_AdditionalConc=Yes&";
			}
			//MS_PRO_Anxiety
			if(this.FormOID =="EBD0B040-0727-4F8B-8B3C-25EB9A95C0E4"){
				this.cumulativeResponses = "Anxiety_AdditionalConcern=Yes&";
			}
			//MS_PRO_SexualFunction
			if(this.FormOID =="0200F343-3E65-45A9-8DBC-686D7ED22DEE"){
				this.cumulativeResponses = "SexualFunction_Additional=Yes&";
			}
			//MS_PRO_Bowel
			if(this.FormOID =="A7B1095B-6C7F-4466-8D70-DE06CAB86A3A"){
				this.cumulativeResponses = "Bowel_AdditionalConcerns=Yes&";
			}
			//MS_PRO_Vision
			if(this.FormOID =="3ED7FE24-8F54-4937-816B-DC18607146B2"){
				this.cumulativeResponses = "Vision_AdditionalConcerns=Yes&";
			}
*/

			this.acService.getNextItemSync(this.FormOID, this.cumulativeResponses).subscribe(
				data => { 
					this.form = data;
				}
			);
		}
	}
}
