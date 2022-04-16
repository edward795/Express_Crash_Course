const express = require("express");
const router = express.Router();
const members = require("../../Members");
const uuid = require("uuid");

//members api
router.get("/", (req, res) => res.json(members));

//get single member
router.get("/:id", (req, res) => {
  const found = members.some((member) => member.id === parseInt(req.params.id));
  if (found) {
    res.send(members.filter((member) => member.id === parseInt(req.params.id)));
  } else {
    res.status(400).json({ msg: `member with id ${req.params.id} not found!` });
  }
});

//create member
router.post("/", (req, res) => {
  const newMember = {
    id: uuid.v4(),
    name: req.body.name,
    email: req.body.email,
    status: "active",
  };
  if (!newMember.email || !newMember.name) {
    return res.status(400).json({ msg: "please include a name and email!" });
  }
  members.push(newMember);
  // res.json(members);  -- for rest apis

  res.redirect("/"); // --for template engine websites
});

//update member
router.put("/:id", (req, res) => {
  const found = members.some((member) => member.id === parseInt(req.params.id));
  if (found) {
    const upMember = req.body;
    members.forEach((member) => {
      if (member.id === parseInt(req.params.id)) {
        member.name = upMember.name ? upMember.name : member.name;
        member.email = upMember.email ? upMember.email : member.email;
        res.json({ msg: "member updated successfully!", member });
      }
    });
  } else {
    res.status(400).json({ msg: `No member with id ${req.params.id} found` });
  }
});

//Delete member
router.delete("/:id", (req, res) => {
  const found = members.some((member) => member.id === parseInt(req.params.id));
  if (found) {
    res.json({
      msg: "member deleted successfully!",
      member: members.filter((member) => member.id !== parseInt(req.params.id)),
    });
  } else {
    res.status(400).json({ msg: `Member with ${req.params.id} not found!` });
  }
});

module.exports = router;
