// Validate Form Fills

function validateFields(){
    var inp = document.getElementsByTagName('input');
	for(var i in inp)
	{
		if(inp[i].type == "text")
		{
			if(/[^a-zA-Z0-9\-\/]/.test(inp[i].value))
			{
				alert('Invalid value detected');
				inp[i].focus();
				return false;
				break;
			}
			if (inp[i].value == "")
			{
				alert('Must fill in ALL sections');
				return false;
				break;
			}
		}
	}
	return true;
}