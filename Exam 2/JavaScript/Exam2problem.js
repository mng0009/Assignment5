function MenuChoice()
{
    if(document.getElementById("menu").value=="Display Category List")
    {
    document.getElementById("section1").style.visibility="visible";
    document.getElementById("section2").style.visibility="hidden";
    document.getElementById("section3").style.visibility="hidden";
    document.getElementById("section4").style.visibility="hidden";
    document.getElementById("section5").style.visibility="hidden";
    }
    else if(document.getElementById("menu").value=="Add Category")
    {
    document.getElementById("section1").style.visibility="hidden";
    document.getElementById("section2").style.visibility="visible";
    document.getElementById("section3").style.visibility="hidden";
    document.getElementById("section4").style.visibility="hidden";
    document.getElementById("section5").style.visibility="hidden";
    }
    else if(document.getElementById("menu").value=="Change Category Description")
    {
    document.getElementById("section1").style.visibility="hidden";
    document.getElementById("section2").style.visibility="hidden";
    document.getElementById("section3").style.visibility="visible";
    document.getElementById("section4").style.visibility="hidden";
    document.getElementById("section5").style.visibility="hidden";
    }
    else if(document.getElementById("menu").value=="Delete Category")
    {
    document.getElementById("section1").style.visibility="hidden";
    document.getElementById("section2").style.visibility="hidden";
    document.getElementById("section3").style.visibility="hidden";
    document.getElementById("section4").style.visibility="visible";
    document.getElementById("section5").style.visibility="hidden";
    }
    else if(document.getElementById("menu").value=="About Me")
    {
    document.getElementById("section1").style.visibility="hidden";
    document.getElementById("section2").style.visibility="hidden";
    document.getElementById("section3").style.visibility="hidden";
    document.getElementById("section4").style.visibility="hidden";
    document.getElementById("section5").style.visibility="visible";
    }
    else
    {
    document.getElementById("section1").style.visibility="hidden";
    document.getElementById("section2").style.visibility="hidden";
    document.getElementById("section3").style.visibility="hidden";
    document.getElementById("section4").style.visibility="hidden";
    document.getElementById("section5").style.visibility="hidden";
    }
}

function DisplayCategory()
{
    var objRequest = new XMLHttpRequest();  
    var url = "http://bus-pluto.ad.uab.edu/jsonwebservice/service1.svc/getAllCategories";    
    
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
        var displaytext = "<table><tr><th>Category ID</th><th>Category Name</th><th>Category Description</th></tr>";         
        
        for (count = 0; count < result.GetAllCategoriesResult.length; count++)
        {
            displaytext += "<tr><td>"+result.GetAllCategoriesResult[count].CID + "</td><td>" +
            result.GetAllCategoriesResult[count].CName + "</td><td>"+
            result.GetAllCategoriesResult[count].CDescription + "</td></tr>";
        }
            displaytext += "</table>";
            document.getElementById("categorylist").innerHTML = displaytext;
    }
function AddCategory()
{
    var objRequest = new XMLHttpRequest();  
    var url = "http://bus-pluto.ad.uab.edu/jsonwebservice/service1.svc/CreateCategory";
    var categoryname=document.getElementById("categoryname").value;
    var categorydescription=document.getElementById("categorydescription").value;
    
    var newcategory= '{"CName":"'+categoryname+'","CDescription":"'+categorydescription+'"}';
    
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
        objRequest.send(newcategory);

}

    function OperationResult(output)
    {
        if (output.WasSuccessful == 1)
        {
        document.getElementById("newcategoryresult").innerHTML = "The operation was successful!"    //code
        }
        else
        {
            document.getElementById("newcategoryresult").innerHTML = "The operation was not successful!" + "<br>" + output.Exception;
        }
    }
    
    function ChangeDescription()
{
    var objRequest = new XMLHttpRequest();  
    var url = "http://bus-pluto.ad.uab.edu/jsonwebservice/service1.svc/updateCatDescription";
    var categoryid=document.getElementById("categoryid").value;
    var categorydescription=document.getElementById("categorydescription").value;
 
    var updatedescription= '{"CID":"'+categoryid+'","CDescription":"'+categorydescription+'"}';
    
    objRequest.onreadystatechange = function()
    {
        if (objRequest.readyState == 4 && objRequest.status == 200)
            {
                var result = JSON.parse(objRequest.responseText);
                UpdateCategoryResult(result);
            }         
    }
        objRequest.open("POST", url, true);
        objRequest.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        objRequest.send(updatedescription);

}

    function UpdateCategoryResult(output)
    {
        if (output == 1)
        {
        document.getElementById("changecategoryresult").innerHTML = "The operation was successful!"    //code
        }
        else
        {
            document.getElementById("changecategoryresult").innerHTML = "The operation was not successful!" + "<br>" + output.Exception;
        }
    }
    
   function DeleteCategory()    
{
    var objRequest = new XMLHttpRequest();  
    var url = "http://bus-pluto.ad.uab.edu/jsonwebservice/service1.svc/deleteCategory/";
    var entercategoryid=document.getElementById("entercategoryid").value;
    url += entercategoryid;
    
    confirm("Are you sure you want to delete this category:"+ entercategoryid+"?");
    
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
        if (output.DeleteCategoryResult.WasSuccessful == 1)
        {
            document.getElementById("deletecategory").innerHTML = "The operation was successful!"    //code
        }
        else
        {
            document.getElementById("deletecategory").innerHTML = "The operation was not successful!" + "<br>" + output.Exception;
        }
    }
    
 