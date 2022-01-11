import { Component,Input,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlantouneService } from 'src/app/services/plantoune.service';



@Component({
  selector: 'app-page-details',
  templateUrl: './page-details.component.html',
  styleUrls: ['./page-details.component.scss']
})
export class PageDetailsComponent implements OnInit {

  plantDetails: any | undefined;


  constructor(private route: ActivatedRoute, private plantouneService: PlantouneService) {


   }

  ngOnInit(): void {



  // First get the product id from the current route.
  const routeParams = this.route.snapshot.paramMap;
  const productIdFromRoute = Number(routeParams.get('plantId'));


  // Find the product that correspond with the id provided in route.
  this.plantouneService.getPlantById(productIdFromRoute).subscribe
  (response =>{
  this.plantDetails=response[0];
  console.log(this.plantDetails);
  })
}

}
