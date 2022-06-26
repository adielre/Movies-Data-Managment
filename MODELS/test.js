

var array = [{ id: 242, name: 'zzz' }, { id: 243, name: 'aaa' }, { id: 244, name: 'sss' }]


array.forEach(x => 
    {
        if(x.id == 243)
        {
            x.name = "aaaaaaaaaa"
        
        }
    });
   

console.log(array)


