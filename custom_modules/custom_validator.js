// exporting modules one by one
/*
var isEmpty = function(obj) {
  return Object.keys(obj).length === 0;
}

module.exports.isEmpty = isEmpty;
*/

// exporting all modules
module.exports = {
	isEmpty:function(obj) {
		if(!obj.lenght){
			return false;
		}
		else{
			return true;
		}
	}

}





