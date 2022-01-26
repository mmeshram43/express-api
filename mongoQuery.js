const mongoose  = require('mongoose')
const blogs  = require('./models/Blogpost')


const mongoQ =  async function mongoQuery(){ 
    
let someblogs =    [
     {
    meta: { votes: 100, favs: 105 },
    title: 'Digital Detox - Necessity of today',
    subTitle: 'We need energy if we want to show up as our best selves in the world',
    category: 'Health',
    body: 'Yep, we’re actually going to avoid phones , tablets, computers.For now. We want to avoid tech for the first hour after waking. This is due to the relationship between caffeine and cortisol.The circadian rhythm controls a part of the brain called the suprachiasmatic nucleus (SCN). The SCN is responsible for releasing cortisol — our stress hormone.We have a natural spike in cortisol about an hour after we wake up — so for most people, around 8–9am. (From when we wake up, our cortisol levels continue rising for about an hour',
    author: 'Mayur Meshram',
    imageUrl: 'https://miro.medium.com/max/875/0*d2vYioYoDbxQO0tW',
    readTime: 5,
    tags: ['Health','lifestyle' ],
    rating: 4
     },
     
  {
    meta: { votes: 55, favs: 15 },
    title: '6 Smart Methods To Stop Getting Distracted By Big Time-Wasters',
    subTitle: '',
    category: 'Self Improvement',
    body: 'If video games are a big distraction for you, make it harder to access by unplugging your video game console from your TV and hiding it in a closet.I started doing this a few months ago, and I don’t regret it.Honestly, this little extra barrier is why I no longer use video games as a distraction from my work. Instead, when I decide to play, it’s a conscious decision instead of an impulsive decision.',
    author: 'Mayur Meshram',
    imageUrl: 'https://miro.medium.com/max/1250/0*_b63MKUbmUFlfbeA',
    readTime: 5,
    tags: [ 'lifestyle' ],
    rating: 4,
  
  },
  {
    meta: { votes: 25, favs: 66 },
    title: 'The Top 12 Technologies to Watch in 2022',
    subTitle: 'Some will scare you, most will blow your mind',
    category: 'Self Improvement',
    body: 'This is not a tech breakthrough per se. Rather, it’s a giant leap in adoption. In 2021, collectors and traders spent $22 billion on NFTs, up from $100 million in 2020. Creators, artists, and even companies jumped on the hype train and seemed to enjoy the ride.For now, the most common NFT application is art, but more are likely to follow. We could, for instance, use the Non-Fungible aspect to ensure authenticity, issue academic credentials, build in-game items, design (digital) fashion, and more.',
    author: 'Mayur Meshram',
    imageUrl: 'https://miro.medium.com/max/1400/1*BBN9s67AkqHP56lJYa3cmQ.png',
    readTime: 5,
    tags: [ 'lifestyle' ],
  
  },
  {
    meta: { votes: 99, favs: 102 },
    title: '3 Ways to Boost Your Energy Levels in the Morning',
    subTitle: 'We need energy if we want to show up as our best selves in the world',
    category: 'Health',
    body: 'Yep, we’re actually going to avoid coffee.For now. We want to avoid coffee for the first hour after waking. This is due to the relationship between caffeine and cortisol.The circadian rhythm controls a part of the brain called the suprachiasmatic nucleus (SCN). The SCN is responsible for releasing cortisol — our stress hormone.We have a natural spike in cortisol about an hour after we wake up — so for most people, around 8–9am. (From when we wake up, our cortisol levels continue rising for about an hour.',
    author: 'Mayur Meshram',
    imageUrl: 'https://miro.medium.com/max/875/0*d2vYioYoDbxQO0tW',
    readTime: 5,
    tags: [ 'lifestyle' ],
    rating: 4,
 
  },
  {
    meta: { votes: 99, favs: 102 },
    title: 'Investing for Long Term',
    subTitle: 'Equity, Debt or Mixed.',
    category: 'Finance',
    body: 'Yep, we’re actually going to avoid coffee.For now. We want to avoid coffee for the first hour after waking. This is due to the relationship between caffeine and cortisol.The circadian rhythm controls a part of the brain called the suprachiasmatic nucleus (SCN). The SCN is responsible for releasing cortisol — our stress hormone.We have a natural spike in cortisol about an hour after we wake up — so for most people, around 8–9am. (From when we wake up, our cortisol levels continue rising for about an hour.',
    author: 'Mayur Meshram',
    imageUrl: 'https://cdn.corporatefinanceinstitute.com/assets/financial-performance.jpeg',
    readTime: 5,
    tags: [ 'Finance' ],
    rating: 4,

  },
  {
    meta: { votes: 74, favs: 103 },
    title: 'Life Insurance in India',
    subTitle: '',
    category: 'Finance',
    body: 'Yep, we’re actually going to avoid coffee.For now. We want to avoid coffee for the first hour after waking. This is due to the relationship between caffeine and cortisol.The circadian rhythm controls a part of the brain called the suprachiasmatic nucleus (SCN). The SCN is responsible for releasing cortisol — our stress hormone.We have a natural spike in cortisol about an hour after we wake up — so for most people, around 8–9am. (From when we wake up, our cortisol levels continue rising for about an hour.',
    author: 'Mayur Meshram',
    imageUrl: 'https://cdn.corporatefinanceinstitute.com/assets/financial-performance.jpeg',
    readTime: 5,
    tags: [ 'Finance' ],
    rating: 4,

  },

]      
      // const response = await blogs.insertMany(someblogs)
      console.log(response)
  }
  
  module.exports = mongoQ
  // mongoQuery();