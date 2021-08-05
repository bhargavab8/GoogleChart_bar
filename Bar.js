(function() { 
    let template = document.createElement("template");
	  template.innerHTML = `
      <style>
      :host {
          display: block;
      } 
  </style> 
<div id="chart_div"></div>`;
    
    class BarChart extends HTMLElement {
		    constructor() {
			      super(); 
			      let shadowRoot = this.attachShadow({mode: "open"});
			      shadowRoot.appendChild(template.content.cloneNode(true));
			
			      this.addEventListener("click", event => {
				        var event = new Event("onClick");
				        this.dispatchEvent(event);
			      });
			      this._props = {};
		    }
	    
        onCustomWidgetBeforeUpdate(changedProperties) {
            this._props = { ...this._props, ...changedProperties };
        }

        onCustomWidgetAfterUpdate(changedProperties) {
            this._props = { ...this._props, ...changedProperties };
            var myprops = this._props
					
			const script = document.createElement('script');
			script.type = 'text/javascript';
			script.async = true;
			script.onload = function () {                  
				google.charts.load('current', {packages: ['corechart', 'bar']});
					google.charts.setOnLoadCallback(function(){
						drawChart(myprops.value);
					});
					function drawChart(props) {   
						var dataportion=props.split(";");
						var chartdata =[['City', '2010 Population',]];
						for (let i=0;i<dataportion.length;i++){
							var a =dataportion[i].split(",");
							var Attr=a[0];
							var Meas=a[1];
							var rec=[Attr,Meas];
							chartdata.push(rec);
						}                                             
						var data = google.visualization.arrayToDataTable(chartdata);
			
							var options = {
								title: '',
								chartArea: {width: '50%'},
								hAxis: {
								  title: 'Measure',
								  minValue: 0
								},
								vAxis: {
								  title: 'Attribute'
								}
							  };
							const ctx = document.querySelector(".sapCustomWidgetWebComponent").shadowRoot.querySelector("#chart_div");
																
							var chart = new google.visualization.Gauge(ctx);
							chart.draw(data, options);
							};                                                            
				}
			script.src = 'https://www.gstatic.com/charts/loader.js';
			//Append it to the document header
			document.head.appendChild(script);
            }
    }
    customElements.define("com-sample-barchart", BarChart);
})();