const Kid = require("../models/Kid")

const fetchKids = async(req,res) => {
    // Find the notes
    const kids = await Kid.find();
    // Respond with them
    res.json({ kids: kids});

};

const fetchKid = async (req, res) => {
    // Get id off the url
    const kidId = req.params.id;
    // Find the kid using that id
    const KID = await Kid.findById(kidId);
    // respond with the kid
    res.json({KID: KID});
};

const createKid = async (req, res) => {
    // Get the sent in data off request body
    const name = req.body.name;
    // Create a kid with it
    const kid = await Kid.create({
        name: name,
    });

    // respond with the new kid
    res.json({ kid: kid });
};

const updateKid = async(req, res) => {
    // Get the id off the url
    const kidId = req.params.id;
    // Get the data off the req body
    const name = req.body.name;
    // Find and update
     await Kid.findByIdAndUpdate(kidId,{
        name: name,
    })
    // Find update kid
    const kid = await Kid.findById(kidId)
    // Respond with it
    res.json({ kid: kid })


};

const deleteKid = async(req,res) => {
    // Get the id off url
    const kidsId = req.params.id;
    // Delete the kid
    await Kid.deleteOne({_id: kidsId});

    // Respond  
    res.json({ success: "Kid deleted" });
    
};

module.exports = {
    fetchKid,
    fetchKids,
    createKid,
    updateKid,
    deleteKid,
};