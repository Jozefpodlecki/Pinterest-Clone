const sampleImages = [
    "https://i.pinimg.com/originals/61/45/f8/6145f8f9f2ad74793b8152929c2bfd2a.jpg",
    "https://i.pinimg.com/236x/b6/98/e5/b698e580e873c6b34c3832c97a4dad24.jpg",
    "https://i.pinimg.com/236x/65/b1/49/65b149e192024fe025faf84bed18d1a1.jpg",
    "https://i.pinimg.com/236x/e1/20/4c/e1204c56cee42142dea1fe50db7d3b28.jpg",
    "https://i.pinimg.com/236x/0e/b7/c7/0eb7c7e2315c9a9d69a0de3efb10e7a9.jpg",
    "https://i.pinimg.com/236x/fd/12/76/fd1276edd6eec2f9a2826bec26fc6b50.jpg",
    "https://i.pinimg.com/236x/71/5c/e4/715ce4fa16601425b31674dcc308ac8a.jpg",
    "https://i.pinimg.com/236x/83/ad/da/83adda5f43d9baf44eaf46e5dcb0e475.jpg",
    "https://i.pinimg.com/236x/8d/66/d6/8d66d68654ff371d191e8de62a647706.jpg"
  ]
  
  const collection = [
    {
      category: 'Animals',
      categoryId: 1,
      images: [
        {
          link: "https://i.pinimg.com/236x/65/b1/49/65b149e192024fe025faf84bed18d1a1.jpg"
        },
        {
          link: "https://i.pinimg.com/236x/8d/66/d6/8d66d68654ff371d191e8de62a647706.jpg"
        }
      ],
    },
    {
      category: 'Forest',
      categoryId: 2,
      images: [
        {
          link: "https://i.pinimg.com/236x/65/b1/49/65b149e192024fe025faf84bed18d1a1.jpg"
        },
        {
          link: "https://i.pinimg.com/236x/8d/66/d6/8d66d68654ff371d191e8de62a647706.jpg"
        },
        {
          link: "https://i.pinimg.com/236x/65/b1/49/65b149e192024fe025faf84bed18d1a1.jpg"
        },
        {
          link: "https://i.pinimg.com/236x/e1/20/4c/e1204c56cee42142dea1fe50db7d3b28.jpg"
        },
        {
          link: "https://i.pinimg.com/236x/8d/66/d6/8d66d68654ff371d191e8de62a647706.jpg"
        }
      ],
    }
  ]
  
  const data = sampleImages.map((link, id) => ({
    id,
    link,
    title: '',
    body: ''
  }))
  
  const categories = [
    {
      id: 1,
      name: 'Forest',
      link: 'https://www.positive.news/wp-content/uploads/2019/03/feat-1800x0-c-center.jpg'
    },
    {
      id: 2,
      name: 'Animals',
      link: 'https://assets.change.org/photos/0/ys/te/RbystepLvbGJuix-800x450-noPad.jpg?1509858550'
    },
    {
      id: 3,
      name: 'Art',
      link: 'https://mymodernmet.com/wp/wp-content/uploads/2019/03/elements-of-art-6.jpg'
    }
  ]
  
  const comments = Array(10).fill(0).map((pr, index) => ({
      id: index + 1,
      userId: 1,
      avatar: "https://i.pinimg.com/236x/b6/98/e5/b698e580e873c6b34c3832c97a4dad24.jpg",
      author: 'Steve Wonders',
      created: (new Date()).toString(),
      text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent tempor diam magna, sit amet tincidunt elit dictum ut. Pellentesque ullamcorper orci a urna consequat, nec vestibulum mi aliquam. Integer at augue nec libero laoreet pulvinar eu eget metus.`
    }));
  