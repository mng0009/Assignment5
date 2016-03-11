function MenuChoice()
{
    if(document.getElementById("menu").value=="About Walt Disney")
    
    {
      document.getElementById("section1").style.visibility = "visible";
      document.getElementById("section2").style.visibility= "hidden";//code
    }
    
    else if(document.getElementById("menu").value=="About Mickey")
    
    {
    document.getElementById("section1").style.visibility="hidden";
    document.getElementById("section2").style.visibility="visible";    //code
    }
    
    else
    
    {
      document.getElementById("section1").style.visibility="hidden";
      document.getElementById("section2").style.visibility="hidden";  
    }
     //code
}