// Nomenclatura de variáveis

const githubUserCategories = [
  {
    categoryName: 'User',
    minFollowersRequired: 5
  },
  {
    categoryName: 'Friendly',
    minFollowersRequired: 50,
  },
  {
    categoryName: 'Famous',
    minFollowersRequired: 500,
  },
  {
    categoryName: 'Super Star',
    minFollowersRequired: 1000,
  },
]

export default async function classifyGithubUser(req, res) {
  const githubUsername = String(req.query.username)

  if (!githubUsername) {
    return res.status(400).json({
      message: `Please provide an username to search on the github API`
    })
  }

  const response = await fetch(`https://api.github.com/users/${githubUsername}`);

  if (response.status === 404) {
    return res.status(400).json({
      message: `User with username "${githubUsername}" not found`
    })
  }

  const githubUserData = await response.json()

  const sortedUserCategories = githubUserCategories.sort((a, b) =>  b.minFollowersRequired - a.minFollowersRequired); 

  const userCategory = sortedUserCategories.find(i => githubUserData.minFollowersRequired > i.minFollowersRequired)
  
 const userWithCategory = {
    githubUsername,
    category: userCategory.categoryName,
  };

  return userWithCategory;
}
