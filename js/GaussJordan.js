var myList = ['apples', 'oranges','bananas'];
var matrix=[];
var equals=[];
function createMatrix(){
	var x = document.getElementById("columns").value;
	var y = document.getElementById("rows").value;
	var send_matrix="";
	var matrix_headers="<tr>";
	matrix = []; 
	for (var i = 0; i < x; i++) {
		matrix[i] =[];
		equals[i] =0;
		send_matrix += "<tr contenteditable="+true+">";
		for (var j = 0; j < y; j++) {
			if (i == x-1) {
				matrix_headers+="<th> X<span class=column_number>"+(j+1)+"</span></th>";
			}
			matrix[i][j]=0;
			send_matrix += "<td id="+'"'+i+""+j+'"'+">"+matrix[i][j]+"</td>";
		}
		var temp= i;
		send_matrix+=  "<td id="+temp+">0</td>"+"</tr>";
	}
	matrix_headers+="<th>b</th>";
	document.getElementById("matrix_table").innerHTML = matrix_headers+send_matrix;
	document.getElementById("solve_button").innerHTML = "<br><button onclick="+'"solveByGaussJordan()"'+"type="+'"button"'+" class="+'"btn btn-primary center-block"'+"id="+'"solveButton"'+">Solve</button>";
}
function solveByGaussJordan(){
	var x = document.getElementById("columns").value;
	var y = document.getElementById("rows").value;
	var temp= 0+""+0;
	for (var i = 0; i < x; i++) {
		equals[i] = document.getElementById(i).innerText;
		for (var j = 0; j < y; j++) {
			temp=i+""+j;
			matrix[i][j] =document.getElementById(temp).innerText;
		}
	}
	var values = solve(matrix, equals);
	var send_matrix="";
	var matrix_headers="<tr>";
	for (var i = 0; i < x; i++) {
		send_matrix += "<tr contenteditable="+true+">";
		for (var j = 0; j < y; j++) {
			if (i == x-1) {
				matrix_headers+="<th> X<span class=column_number>"+(j+1)+"</span></th>";
			}
			send_matrix += "<td id="+'"'+i+""+j+'"'+">"+matrix[i][j]+"</td>";
		}
		var temp= i;
		send_matrix+=  "<td id="+temp+">"+values[i]+"</td>"+"</tr>";
	}
	matrix_headers+="<th>b</th>";
	document.getElementById("matrix_table").innerHTML = matrix_headers+send_matrix;
	//document.getElementById("demo").innerHTML ="FUNCTION NOT READY YET";
	//solve(matrix,equals);
}

function diagonalize(temp) {
  var m = temp.length;
  var n = temp[0].length;
  for(var k=0; k<Math.min(m,n); ++k) {
    i_max = findPivot(temp, k);
    if (matrix[i_max, k] == 0)
      throw "matrix is singular";
    swap_rows(temp, k, i_max);
    for(var i=k+1; i<m; ++i) {
      var c = matrix[i][k] / matrix[k][k];
      for(var j=k+1; j<n; ++j) {
        matrix[i][j] = matrix[i][j] - matrix[k][j] * c;
      }
      matrix[i][k] = 0;
    }
  }
}


function findPivot(temp, k) {
  var i_max = k;
  for(var i=k+1; i<temp.length; ++i) {
    if (Math.abs(temp[i][k]) > Math.abs(temp[i_max][k])) {
      i_max = i;
    }
  }
  return i_max;
}

function swap_rows(temp, i_max, k) {
  if (i_max != k) {
    var temp = matrix[i_max];
    matrix[i_max] = matrix[k];
    matrix[k] = temp;
  }
}

function makeM(matrix, equals) {
  for(var i=0; i<matrix.length; ++i) {
    matrix[i].push(equals[i]);
  }
}

function substitute(temp) {
  var m = temp.length;
  for(var i=m-1; i>=0; --i) {
    var x = temp[i][m] / temp[i][i];
    for(var j=i-1; j>=0; --j) {
      temp[j][m] -= x * temp[j][i];
      temp[j][i] = 0;
    }
    temp[i][m] = x;
    temp[i][i] = 1;
  }
}

function extractX(temp) {
  var x = [];
  var m = matrix.length;
  var n = matrix[0].length;
  for(var i=0; i<m; ++i){
    x.push(matrix[i][n-1]);
  }
  return x;
}

function solve(matrix, equals) {
  makeM(matrix,equals);
  diagonalize(matrix);
  substitute(matrix);
  var b = extractX(matrix);
  return b;
}

