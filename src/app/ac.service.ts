import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { environment } from '../environments/environment';
import { Item } from './item';
import { Element } from './element';
import { Map } from './map';
import { Battery } from './battery';
import { Form } from './form';

  const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded','Accept':'application/json','Authorization': environment.authentication}) 
  };

  const httpOptions2 = {
    headers: new HttpHeaders({ 'Content-Type': 'text/plain'}) 
  };
  const BatteryOID = "1A3C00D7-94A3-4634-AEAC-BEB14EF3369F"; //MS-PRO

@Injectable()
export class ACService {

	constructor(private http: HttpClient) {}


	saveImage(data: string): Observable<any>{
	
		
		    return this.http.post<any>(environment.server,data,httpOptions2).pipe(
		    map( (res: any) => {
		    	return res;
		    }
		    ),catchError(<T>(error: any, result?: T) => {
	        	console.log(error);
	        	return of(result as T);
	      	})
		  	);
		}

	getBatteryForms(): Observable<any>{

	    return this.http.post<any>(environment.api + "/2014-01/Batteries/" + BatteryOID + ".json","",httpOptions).pipe(
	    map( (res: any) => {
	    	if(res.Forms){
	    		return res.Forms;
	    	}else{
	    		return null;
	    	}	
	    }
	    ),catchError(<T>(error: any, result?: T) => {
        	console.log(error);
        	return of(result as T);
      	})
	  	);
	}

	getScore(FormOID: string, data: string): Observable<any>{
	    return this.http.post<any>(environment.api + "/2013-01/Scores/" + FormOID + ".json",data.substring(0,data.length -1),httpOptions).pipe(
	    map( (res: any) => {
	    	return res;
	    	//{"Form":[{"Theta":"0.803000985533661","StdError":"0.685513904782456"}]}	
	    }
	    ),catchError(<T>(error: any, result?: T) => {
        	console.log(error);
        	return of(result as T);
      	})
	  	);
	}

	getNextItemSync(FormOID: string, data: string): Observable<any>{

		if(FormOID == "998C9910-4EAF-436B-B5D5-83AB2ECB09B6"){
			data = data + "EngineAssembly=MSS.Engines&EngineType=MSS.Engines.SequenceEngine";
		} else {
			data = data + "EngineAssembly=MSS.Engines&EngineType=MSS.Engines.SequenceBranchEngine";
		}

	    return this.http.post<any>(environment.api + "/2014-01/StatelessParticipants/" + FormOID + ".json",data,httpOptions).pipe(
	    map( (res: any) => {
			return res;
	    }
	    ),catchError(<T>(error: any, result?: T) => {
        	console.log(error);
        	return of(result as T);
      	})
	  	);
	}
}