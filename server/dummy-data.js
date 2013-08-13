setServerStartupItems(function(){
  //Default data into the taunt collection if it's a brand new database (for testing)
  //dummy-data
  if (tauntColl.find().count() === 0) {
     var data = [
        {
          taunt:{
            bodyText:'Guns sucks',
            datePosted: new Date(),
            tags: ['guns','politics','sucks']
          },
          avatarChat:[
            {
              bodyText:'No you suck No you suck No you suck No you suck No you suck No you suck No you suck No you suck',
              datePosted: new Date(),
              avatar:'/avatars/tiger.jpg'
            },
            {
              bodyText:'Bite me hillbilly.',
              datePosted: new Date(),
              avatar:'/avatars/moe.jpg'
            }
          ],
          exposedChat:[
            {
              bodyText:'This exposedChat is really heating up',
              datePosted: new Date(),
              avatar:'/profilepics/brian.jpg',
              userId:'108334',
              userName:'Crixus'
            },
            {
              bodyText:'I agree, quite.',
              datePosted: new Date(),
              avatar:'/profilepics/andy.jpg',
              userId:'3945893',
              userName:'Richard'
            }
          ],
          latestavatarChat:'zzz',
          latestexposedChat:'zzz'
        },
        {
          taunt:{
            bodyText:'Pot rules',
            datePosted: new Date(),
            tags: ['guns','politics','sucks']
          },
          avatarChat:[
            {
              bodyText:'No you suck',
              datePosted: new Date(),
              avatar:'/avatars/tiger.jpg'
            },
            {
              bodyText:'Bite me hillbilly.',
              datePosted: new Date(),
              avatar:'/avatars/moe.jpg'
            }
          ],
          exposedChat:[
            {
              bodyText:'This exposedChat is really heating up',
              datePosted: new Date(),
              avatar:'/profilepics/andy.png',
              userId:'108334',
              userName:'Crixus'
            },
            {
              bodyText:'I agree, quite.',
              datePosted: new Date(),
              avatar:'/profilepics/brian.png',
              userId:'3945893',
              userName:'Richard'
            }
          ],
          latestavatarChat:'zzz',
          latestexposedChat:'zzz'
        }
     ]
     for (var i = 0; i < data.length; i++){
        tauntColl.insert(data[i]);
     }
  }
});