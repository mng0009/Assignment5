function MenuChoice()
{
    if(document.getElementById("menu").value=="Create New Customer")
    {
    document.getElementById("section1").style.visibility="visible";
    document.getElementById("section2").style.visibility="hidden";
    document.getElementById("section3").style.visibility="hidden";
    }
    else if(document.getElementById("menu").value=="Update Order Address")
    {
    document.getElementById("section1").style.visibility="hidden";
    document.getElementById("section2").style.visibility="visible";
    document.getElementById("section3").style.visibility="hidden";
    }
    else if(document.getElementById("menu").value=="Delete Customer")
    {
    document.getElementById("section1").style.visibility="hidden";
    document.getElementById("section2").style.visibility="hidden";
    document.getElementById("section3").style.visibility="visible";
    }
    else
    {
    document.getElementById("section1").style.visibility="hidden";
    document.getElementById("section2").style.visibility="hidden";
    document.getElementById("section3").style.visibility="hidden";
    }

}

function CreateCustomer()
{
    var objRequest = new XMLHttpRequest();  
    var url = "http://bus-pluto.ad.uab.edu/jsonwebservice/service1.svc/CreateCustomer";
    var customerid=document.getElementById("customerid").value;
    var customername=document.getElementById("customername").value;
    var customercity=document.getElementById("customercity").value;
    
    var newcustomer= '{"CustomerID":"'+customerid+'","CompanyName":"'+customername+'", "City":"'+customercity+'"}';
    
    objRequest.onreadystatechange = function()
    {
        if (objRequest.readyState == 4 && objRequest.status == 200)
            {
                var result = JSON.parse(objRequest.responseText);
                OperationResult(result);
            }         
    }
        objRequest.open("POST", url, true);
        objRequest.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        objRequest.send(newcustomer);

}

    function OperationResult(output)
    {
        if (output.WasSuccessful == 1)
        {
        document.getElementById("newcustomerresult").innerHTML = "The operation was successful!"    //code
        }
        else
        {
            document.getElementById("newcustomerresult").innerHTML = "The operation was not successful!" + "<br>" + output.Exception;
        }
    }
 
 function UpdateCustomer()
{
    var objRequest = new XMLHttpRequest();  
    var url = "http://bus-pluto.ad.uab.edu/jsonwebservice/service1.svc/updateOrderAddress";
    var orderid=document.getElementById("orderid").value;
    var shipaddress=document.getElementById("shipaddress").value;
    var shipcity=document.getElementById("shipcity").value;
    var shipname=document.getElementById("shipname").value;
    var shippostcode=document.getElementById("shippostcode").value;
    
    var updatecustomer= '{"OrderID":"'+orderid+'","ShipAddress":"'+shipaddress+'", "ShipCity":"'+shipcity+'", "ShipName":"'+shipname+'", "ShipPostcode":"'+shippostcode+'"}';
    
    objRequest.onreadystatechange = function()
    {
        if (objRequest.readyState == 4 && objRequest.status == 200)
            {
                var result = JSON.parse(objRequest.responseText);
                UpdateCustomerResult(result);
            }         
    }
        objRequest.open("POST", url, true);
        objRequest.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        objRequest.send(updatecustomer);

}

    function UpdateCustomerResult(output)
    {
        if (output == 1)
        {
        document.getElementById("updatecustomerresult").innerHTML = "The operation was successful!"    //code
        }
        else
        {
            document.getElementById("updatecustomerresult").innerHTML = "The operation was not successful!" + "<br>" + output.Exception;
        }
    }
       
 
    
function DeleteCustomer()    
{
    var objRequest = new XMLHttpRequest();  
    var url = "http://bus-pluto.ad.uab.edu/jsonwebservice/service1.svc/deleteCustomer/";
    var entercustomerid=document.getElementById("entercustomerid").value;
    url += entercustomerid;
    
    confirm("Are you sure you want to delete this customer:"+ entercustomerid+"?");
    
    objRequest.onreadystatechange = function()
    {
        if (objRequest.readyState == 4 && objRequest.status == 200)
            {
                var result = JSON.parse(objRequest.responseText);
                Delete(result);
            }         
    }    
        objRequest.open("GET", url, true);
        objRequest.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        objRequest.send();
}

    function Delete(output)
    {
        if (output.DeleteCustomerResult.WasSuccessful == 1)
        {
            document.getElementById("deletecustomer").innerHTML = "The operation was successful!"    //code
        }
        else
        {
            document.getElementById("deletecustomer").innerHTML = "The operation was not successful!" + "<br>" + output.Exception;
        }
    }
    
