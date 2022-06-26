//HDFC

var firebaseConfig = {
    apiKey: "AIzaSyBcGBdNqOEmWu_M9U-GjijRVUnS924Bi0Q",
    authDomain: "buildint-ebd3e.firebaseapp.com",
    databaseURL: "https://buildint-ebd3e-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "buildint-ebd3e",
    storageBucket: "buildint-ebd3e.appspot.com",
    messagingSenderId: "198539515334",
    appId: "1:198539515334:web:4151ea6c2f818901af4ec7",
    measurementId: "G-N03S00YSWS"
  };
  
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
var database = firebase.database();
let utctoday = new Date();
var ref,ref2, ref3, ref4;
var date;
// let today = new Date(utctoday.getTime() - (utctoday.getTimezoneOffset() * 60000)).toJSON().slice(0,10);

$('#datepicker').datepicker({
    format: 'yyyy-mm-dd',
    endDate: 'd',
    autoclose: true,   
})

window.onload = function(e){
    date = new Date(utctoday.getTime() - (utctoday.getTimezoneOffset() * 60000)).toJSON().slice(0,10);

    if (window.name == '') {
        document.getElementById('date_input').setAttribute('value',date);
        ref = database.ref("hdfc/HDFC BANGLORE BRANCH EMS 1/consumption/" + date);
        ref2 = database.ref("hdfc/ac/consumption/" + date);
        ref3 = database.ref("hdfc/it/consumption/" + date);
        ref4 = database.ref("hdfc/dg/consumption/" + date);


        dataCall()
    }

    else{
        document.getElementById('date_input').setAttribute('value',window.name);
        ref = database.ref("hdfc/HDFC BANGLORE BRANCH EMS 1/consumption/" + window.name);
        ref2 = database.ref("hdfc/ac/consumption/" + window.name);
        ref3 = database.ref("hdfc/it/consumption/" + window.name);
        ref4 = database.ref("hdfc/dg/consumption/" + window.name);
        dataCall()

    }
}

$('#datepicker').datepicker().on('change', function (ev) {
    window.name = $("#datepicker").data('datepicker').getFormattedDate('yyyy-mm-dd');
    location.reload()
});

var CH1A,CH1B,CH1C,CH2A,CH2B,CH2C,CH3A,CH3B,CH3C,CH1AValues,CH1BValues,CH1CValues,CH2AValues,CH2BValues,CH2CValues,CH3AValues,CH3BValues,CH3CValues,time,FwdWh_1,FwdWh_1Values,FwdWh_2,FwdWh_2Values,FwdWh_3,FwdWh_3Values;                                      
let lenghts;
function dataCall(){
    ref.on('value', async function (snapshot){
        CH1A =  await snapshot.child("CH1 - Active Power Total A").val();
        CH1AValues = Object.values(CH1A);
        CH1B = await snapshot.child("CH1 - Active Power Total B").val();
        CH1BValues = Object.values(CH1B);
        CH1C = await snapshot.child("CH1 - Active Power Total C").val();
        CH1CValues = Object.values(CH1C);
        CH2A = await snapshot.child("CH2 - Active Power Total A").val();
        CH2AValues = Object.values(CH2A);
        CH2B = await snapshot.child("CH2 - Active Power Total B").val();
        CH2BValues = Object.values(CH2B);
        CH2C = await snapshot.child("CH2 - Active Power Total C").val();
        CH2CValues = Object.values(CH2C);
        CH3A = await snapshot.child("CH3 - Active Power Total A").val();
        CH3AValues = Object.values(CH3A);
        CH3B = await snapshot.child("CH3 - Active Power Total B").val();
        CH3BValues = Object.values(CH3B);
        CH3C = await snapshot.child("CH3 - Active Power Total C").val();
        CH3CValues = Object.values(CH3C);
        lenghts = Object.keys(CH1A).length;
        time = Object.keys(CH1A)
    });

    ref2.on('value', async function (snapshot){
        FwdWh_1 =  await snapshot.child("FwdWh").val();
        FwdWh_1Values = Object.values(FwdWh_1);
    });

    ref3.on('value', async function (snapshot){
        FwdWh_2 =  await snapshot.child("FwdWh").val();
        FwdWh_2Values = Object.values(FwdWh_2);
    });

    ref4.on('value', async function (snapshot){
        FwdWh_3 =  await snapshot.child("FwdWh").val();
        FwdWh_3Values = Object.values(FwdWh_3);
    });

    setTimeout(() => {
        
        new ApexCharts(document.querySelector("#lineChart"), { 
            series: [
                {
                    name: "CH1 - Active Power Total A",
                    data: CH1AValues
                },
    
                {
                    name: "CH1 - Active Power Total B", 
                    data: CH1BValues
                },
    
                {
                    name: "CH1 - Active Power Total C", 
                    data: CH1CValues
                },
    
                {
                    name: "CH2 - Active Power Total A",
                    data: CH2AValues
                },
    
                {
                    name: "CH2 - Active Power Total B", 
                    data: CH2BValues
                },
    
                {
                    name: "CH2 - Active Power Total C", 
                    data: CH2CValues
                },
    
                {
                    name: "CH3 - Active Power Total A",
                    data: CH3AValues
                },
    
                {
                    name: "CH3 - Active Power Total B", 
                    data: CH3BValues
                },
    
                {
                    name: "CH3 - Active Power Total C", 
                    data: CH3CValues
                }, 
    
            ],
            chart: {
                height: 350,
                type: 'line',
                zoom: {
                enabled: false
                }
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: 'straight'
            },
            grid: {
                row: {
                colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                opacity: 0.5
                },
            },
            xaxis: {
                categories: time,
                labels: {
                    style: {
                        fontSize: '12px'
                    }
                }
            },
            responsive: [
                {
                    breakpoint: 720,
                    options: {
                    xaxis: {
                        labels: {
                            style: {
                                fontSize: '8px'
                                }
                            }
                        },
                    }
                }
            ]
    
        }).render();

        new ApexCharts(document.querySelector("#lineChart1"), { 
            series: [
                {
                    name: "FwdWh",
                    data: FwdWh_1Values
                },
            ],
            chart: {
                height: 350,
                type: 'line',
                zoom: {
                enabled: false
                }
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: 'straight'
            },
            grid: {
                row: {
                colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                opacity: 0.5
                },
            },
            xaxis: {
                categories: time,
                labels: {
                    style: {
                        fontSize: '12px'
                    }
                }
            },
            responsive: [
                {
                    breakpoint: 720,
                    options: {
                    xaxis: {
                        labels: {
                            style: {
                                fontSize: '8px'
                            }
                        }
                    },
                    }
                }
            ]
    
        }).render();

        new ApexCharts(document.querySelector("#lineChart2"), { 
            series: [
                {
                    name: "FwdWh",
                    data: FwdWh_2Values
                },
            ],
            chart: {
                height: 350,
                type: 'line',
                zoom: {
                enabled: false
                }
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: 'straight'
            },
            grid: {
                row: {
                colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                opacity: 0.5
                },
            },
            xaxis: {
                categories: time,
                labels: {
                    style: {
                        fontSize: '12px'
                    }
                }
            },
            responsive: [
                {
                    breakpoint: 720,
                    options: {
                    xaxis: {
                        labels: {
                            style: {
                                fontSize: '8px'
                            }
                        }
                    },
                    }
                }
            ]
    
        }).render();

        new ApexCharts(document.querySelector("#lineChart3"), { 
            series: [
                {
                    name: "FwdWh",
                    data: FwdWh_3Values
                },
            ],
            chart: {
                height: 350,
                type: 'line',
                zoom: {
                enabled: false
                }
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: 'straight'
            },
            grid: {
                row: {
                colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                opacity: 0.5
                },
            },
            xaxis: {
                categories: time,
                labels: {
                    style: {
                        fontSize: '12px'
                    }
                }
            },
            responsive: [
                {
                    breakpoint: 720,
                    options: {
                    xaxis: {
                        labels: {
                            style: {
                                fontSize: '8px'
                            }
                        }
                    },
                    }
                }
            ]
    
        }).render();

    }, 1000);
}
