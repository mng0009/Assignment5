function MenuChoice()
{
    if(document.getElementById("menu").value=="Customer Information")
    {
    document.getElementById("section1").style.visibility="visible";
    document.getElementById("section2").style.visibility="hidden";
    document.getElementById("section3").style.visibility="hidden";//code
    }
    
    else if(document.getElementById("menu").value=="Customer's Order History")
    {
    document.getElementById("section1").style.visibility="hidden";
    document.getElementById("section2").style.visibility="visible";
    document.getElementById("section3").style.visibility="hidden";//code
    }
    
    else if(document.getElementById("menu").value=="Customer's Current Orders")
    {
    document.getElementById("section1").style.visibility="hidden";
    document.getElementById("section2").style.visibility="hidden";
    document.getElementById("section3").style.visibility="visible";//code
    }
    
    else
    {
    document.getElementById("section1").style.visibility="hidden";
    document.getElementById("section2").style.visibility="hidden";
    document.getElementById("section3").style.visibility="hidden";
    }

}

function GetInformation()
{
    var objRequest = new XMLHttpRequest();  
    var url = "http://bus-pluto.ad.uab.edu/jsonwebservice/service1.svc/getAllCustomers";    
    
    objRequest.onreadystatechange = function()
    {
        if (objRequest.readyState == 4 && objRequest.status == 200)
            {
                var output = JSON.parse(objRequest.responseText);
                GenerateInformation(output);
            }         
    }
        objRequest.open("GET", url, true);
        objRequest.send();

}

    function GenerateInformation(result)
    {
        var count = 0;
        var displaytext = "<table><tr><th>Customer ID</th><th>Customer Name</th><th>Customer City</th></tr>";         
        
        for (count = 0; count < result.GetAllCustomersResult.length; count++)
        {
            displaytext += "<tr><td>"+result.GetAllCustomersResult[count].CustomerID + "</td><td>" +
            result.GetAllCustomersResult[count].CompanyName + "</td><td>"+
            result.GetAllCustomersResult[count].City + "</td></tr>";
        }
            displaytext += "</table>";
            document.getElementById("customerdisplay").innerHTML = displaytext;
    }
    
function GetOrderHistory()    
{
    var objRequest = new XMLHttpRequest();  
    var url = "http://bus-pluto.ad.uab.edu/jsonwebservice/service1.svc/getCustomerOrderHistory/";
    url += document.getElementById("customerid").value;        
    
    objRequest.onreadystatechange = function()
    {
        if (objRequest.readyState == 4 && objRequest.status == 200)
            {
                var output = JSON.parse(objRequest.responseText);
                GenerateOrderHistory(output);
            }         
    }    
        objRequest.open("GET", url, true);
        objRequest.send();
}

    function GenerateOrderHistory(result)
    {
        var count = 0;
        var displaytext = "<table><tr><th>Product Name</th><th>Total Product Quantity Ordered/th></tr>";         
        
        for (count = 0; count < result.length; count++)
        {
            displaytext += "<tr><td>"+result[count].ProductName + "</td><td>" +
            result[count].Total + "</td></tr>";
        }
    
            displaytext += "</table>";
            document.getElementById("previousordersdisplay").innerHTML = displaytext;
    }
    
function GetCurrentOrder()    
{
    var objRequest = new XMLHttpRequest();  
    var url = "http://bus-pluto.ad.uab.edu/jsonwebservice/service1.svc/getOrdersForCustomer/";
    url += document.getElementById("anothercustomerid").value;        
    
    objRequest.onreadystatechange = function()
    {
        if (objRequest.readyState == 4 && objRequest.status == 200)
        {
            var output = JSON.parse(objRequest.responseText);
            GenerateCurrentOrder(output);
        }         
    }
        objRequest.open("GET", url, true);
        objRequest.send();
}

    function GenerateCurrentOrder(result)
    {
        var count = 0;
        var displaytext = "<table><tr><th>Order Date</th><th>Order ID</th><th>Shipping Address</th><th>Shipping City</th><th>Shipping Name</th><th>Shipping Postal Code</th><th>Shipped Date</th></tr>";         
        
        for (count = 0; count < result.GetOrdersForCustomerResult.length; count++)
        {

        displaytext += "<tr><td>"+result.GetOrdersForCustomerResult[count].OrderDate + "</td><td>" +
        result.GetOrdersForCustomerResult[count].OrderID + "</td><td>"+
        result.GetOrdersForCustomerResult[count].ShipAddress + "</td><td>"+
        result.GetOrdersForCustomerResult[count].ShipCity + "</td><td>"+
        result.GetOrdersForCustomerResult[count].ShipName + "</td><td>"+
        result.GetOrdersForCustomerResult[count].ShipPostcode + "</td><td>"+
        result.GetOrdersForCustomerResult[count].ShippedDate + "</td></tr>";
        }
            displaytext += "</table>";
            document.getElementById("currentordersdisplay").innerHTML = displaytext;
    }