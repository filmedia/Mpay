
var _=require('lodash')
const {Profile}=require('../model/user.model')
function shuffle(s) {
    var arr = s.split('');           // Convert String to array
    var n = arr.length;              // Length of the array
    
    for(var i=0 ; i<n-1 ; ++i) {
      var j = _.random(n);       // Get random of [0, n-1]
      
      var temp = arr[i];             // Swap arr[i] and arr[j]
      arr[i] = arr[j];
      arr[j] = temp;
    }
    
    s = arr.join('');                // Convert Array to string
    return s;                        // Return shuffled string
  }

   const generate_username=async(string_name)=>{
    var username_parts = string_name;
    var username_parts = string_name.split(' ')

    var part1 = (username_parts[0])?username_parts[0]:""; //cut first name to 8 letters
    var part2 = (username_parts[1])?username_parts[1]:""; //cut second name to 5 letters
    
    var part3 = ['_',''];
    var part4 = ['',shuffle('0123456789').substr(0,2)];
    var part12=[part1,part2];

    const usernameArray=
    [   
        part12[_.random(0,1)],
        part1.substr(0,1)+part2,
        part2.substr(0,1)+part1,
        part2.substr(0,4),
        part1.substr(0,4)
    ];
    
    
    const username = usernameArray[_.random(0,4)]+part3[_.random(0,1)]+part4[_.random(0,1)]; //str_shuffle to randomly shuffle all characters 
    
      const result = await Profile.count({where:{username}});

        if(username.length<4|| result>0){
            return generate_username(string_name);
        }

          

    return username.toLowerCase()
   
     

}

const getCountPost=async()=>{
  const d=await Profile.count({where:{username:'bens'}});
  return d;
}
module.exports={generate_username,getCountPost}

