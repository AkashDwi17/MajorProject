//Delete Route
app.delete("/listings/:id", async (req, res) => {
  let { id } = req.params;
  let deleatedListing = await Listing.findByIdAndDelete(id);
  console.log (deleatedListing);
  res.redirect("/listing");  
});


<!-- <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Show Listing</title>
</head>
<body>
    <h3>Listing Details</h3>
    <ul>
        <li><strong>Title:</strong> <%= listing.title %></li>
        <li><strong>Description:</strong> <%= listing.discription %></li> 
        <li><strong>Price:</strong> &#8377; <%= listing.price.toLocaleString("en-IN") %></li>
        <li><strong>Location:</strong> <%= listing.location %></li>
        <li><strong>Country:</strong> <%= listing.country %></li>
    </ul>
    <br><br>

    <a href="/listings/<%= listing._id %>/edit">Edit this listing</a>

    <br><br>
    <form method="POST" action="/listings/<%= listing._id %>?_method=DELETE">
        <button type="submit">Delete this listing</button>
    </form>
    
</body>
</html> --></br>