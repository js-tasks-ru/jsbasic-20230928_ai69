function makeFriendsList(friends) {
  const ul = document.createElement("ul");

  friends.forEach((names) => {
    let li = document.createElement("li");
    li.innerHTML = `${names.firstName} ${names.lastName}`;
    ul.append(li);
  });

  return ul;
}
