import {Component} from '@angular/core';

@Component({
    selector: 'app-footer',
    template: `
        <div class="layout-footer">
						

		<!-- <div class="p-mb-3 p-text-left">Left</div> -->
			<div class="p-mb-3 p-text-left" >
				<img src="assets/layout/images/logoedutech.svg" alt="assets/layout/images/" style="height: 50px; width:50px" />
				<div >
					<h1 style="font-size: 18px;
                 	color: $textColor;
                 	font-weight: normal;
    	       		margin: 0;">LOMpad Schema</h1>						
				</div>
			</div>
			
							
			<div class="p-mb-3 p-text-center">
				<a href="https://catedraunescoinclusion.org/">
					<img src="assets/layout/images/unitwin_ec_salesiana_sp.png" style="height: 80px; width:200px" >					
				</a>				
				<div class="text">
				<span>© 2021 {{"Todos los derechos reservados" | translate }} | Developed By EduTech</span>	
				<br>						
				<span>{{"Términos y condiciones" | translate }}</span>
				</div>				
			</div>
									
				
			
			
				<!-- <div class="p-mb-3 p-text-left">Left</div>
				<div class="p-mb-3 p-text-center">Center</div>
				<div class="p-text-right">Right</div> -->

				<!-- <div class="p-text-right">
												
				</div> -->

				<div class="p-mb-3 p-text-rigth">											
					<img src="assets/layout/images/cofinanciado_derecha.png" style="height: 60px; width:235px"  />									
				</div>

		
        </div>
    `
})
export class AppFooterComponent {

}
