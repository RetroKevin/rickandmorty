'use strict'

const charSheet = document.querySelector('.character-sheet')
const footer = document.querySelector('.footer')

const rng = (min, max) => Math.floor(Math.random() * (max - min) + min)

const makeHtml = function (charData, charEpisode) {
  const html = `
  <div class="container char-box">
    <div class="char-img-box">
      <img class="char-img" src="${charData.image}" />
    </div>
    <div class="char-data">
      <h2 class="char-name">Name: ${charData.name}</h2>
      <h3 class="char-species">Status: ${charData.status}</h3>
      <h3 class="char-species">Species: ${charData.species}</h3>
      <h3 class="char-gender">Gender: ${charData.gender}</h3>      
      <h3 class="char-gender">Type: ${charData.type}</h3>      
      <h3 class="char-loc">Origins: ${charData.origin.name}</h3>
      <h3 class="char-loc">Last known location: ${charData.location.name}</h3>
      <h3 class="char-first-episode-name">First seen in: ${charEpisode.name}</h3>
      <h3 class="char-first-episode">Episode: ${charEpisode.episode}</h3>
      <h3 class="char-first-episode-aired">Aired On: ${charEpisode.air_date}</h3>
      <h3 class="char-id">ID #: ${charData.id}</h3>
    </div>
  </div>
`
  charSheet.insertAdjacentHTML('beforeend', html)
}

const getCharInfo = function (e) {
  fetch(`https://rickandmortyapi.com/api/character/${e}`)
    .then(response => response.json())
    .then(function (charData) {
      getCharEpisode(charData.episode[0], charData)
    })
}

const getCharEpisode = function (charEpisodeData, charData) {
  fetch(`${charEpisodeData}`)
    .then(response => response.json())
    .then(function (charEpisode) {
      makeHtml(charData, charEpisode)
    })
}

const genNineChar = function () {
  for (let i = 1; i < 10; ++i) {
    getCharInfo(rng(1, 826))
  }
}

const observer = new IntersectionObserver(
  function (entries) {
    const ent = entries[0]
    if (ent.isIntersecting) genNineChar()
  },
  {
    root: null,
    threshold: 0,
    rootMargin: '-9px'
  }
)

observer.observe(footer)
