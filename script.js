const API_ENDPOINT='https://api.site.com/news'
function isNewsRead(newsId) {
    const readNews = JSON.parse(localStorage.getItem('readNews')) || [];
    return readNews.includes(newsId);
  }
  

  function markNewsAsRead(newsId) {
    let readNews = JSON.parse(localStorage.getItem('readNews')) || [];
    if (!readNews.includes(newsId)) {
      readNews.push(newsId);
      localStorage.setItem('readNews', JSON.stringify(readNews));
    }
    closeModal();
  }
  

  function openModal(newsItem) {
    if (!isNewsRead(newsItem.id)) {
      document.getElementById('newsTitle').textContent = newsItem.title;
      document.getElementById('newsDatetime').textContent = newsItem.datetime;
      document.getElementById('newsDescription').textContent = newsItem.description;
      
      document.getElementById('newsModal').style.display = 'block';
  
      document.getElementById('markAsReadBtn').onclick = function() {
        markNewsAsRead(newsItem.id);
      };
    }
  }
  

  function closeModal() {
    document.getElementById('newsModal').style.display = 'none';
  }
  

  document.querySelector('.close').onclick = closeModal;
  

  async function fetchNewsFromAPI() {
    try {
      const response = await fetch(API_ENDPOINT); 
      const newsList = await response.json();
  

      newsList.forEach(newsItem => {
        openModal(newsItem);
      });
    } catch (error) {
      console.error('Error fetching news:', error);
    }
  }
  

  window.onload = function() {
    fetchNewsFromAPI();
  };
  
