define([], function () {
        //return an object to define the "my/shirt" module.

        var members = [];

        var membersInJail = [];


        // Function to get more than 50. But it's 5 because I don't want to add so much criminals in my program
        function getMoreThan5()
        {
            var res = [];
            console.log(members.length);
            for(var i in members)
            {
                if(members[i].countMinions() > 5)
                {
                    res.push(members[i].name  + " is a really mafia leader");
                }
            }

            return res;

        }


        // To fix a double combo: first go to jail the child, then the parent, then recover the child  and not recover the parent
        function changeParentInJail(oldBoss, newBoss)
        {
            for(var i=0;i<membersInJail.length;i++)
            {
                if(membersInJail[i].parent.name == oldBoss.name)
                {
                    membersInJail[i].parent = newBoss;
                    break;
                }
            }

        }

        // Go to jail
        function remove(minion) {
            var currentMinion = members[minion];

            console.log("Current ", currentMinion )
            if (currentMinion.parent != null)
            {
                currentMinion.parent.toJainMinion(minion);
            }
            else
            {
                if(currentMinion.minions.length > 0)
                {
                    membersInJail.push(currentMinion);
                    for(var i=1;i<currentMinion.minions.length;i++)
                    {
                        currentMinion.minions[i].parent = currentMinion.minions[0];
                        currentMinion.minions[0].insertMinion(currentMinion.minions[i])
                    }
                }
            }


            console.log("Remove ", currentMinion);
            return currentMinion;
        }

        // Recover from jail
        function recover(minion)
        {
            var currentMinion = members[minion];


            for(var i=0;i<membersInJail.length;i++)
            {
                if(membersInJail[i].name == minion)
                {
                    membersInJail.splice(i,1);
                    break;
                }
            }

            for(var i=0;i<currentMinion.minions.length;i++)
            {
                var minionToReasign = currentMinion.minions[i];

                minionToReasign.parent.removeMinion(minionToReasign.name);

                minionToReasign.parent = currentMinion;

            }

            currentMinion.parent.insertMinion(currentMinion);

            console.log("recover ", currentMinion);

            return currentMinion;
        }


        // Just the object mafiamember
        var MafiaMember = function(name, age, parent){

            this.name = name;
            this.age = age;

            this.minions = [];


            if(parent != null)
            {
                var boss = members[parent];

                boss.insertMinion(this);

                this.parent = members[parent];
            }
            else this.parent = null;


            // Insert minion into the actual mafia member. Ordered by age
            this.insertMinion = function(minion)
            {
                for(var i=0;i<this.minions.length;i++)
                {
                    var currentMinion = this.minions[i];

                    if(currentMinion.age < minion.age)
                    {
                        this.minions.splice(i,0,minion);
                        break;
                    }
                }

                if(i == this.minions.length)
                    this.minions.push(minion);
            }

            // Count the total of minions. Recursively (oh dear)
            this.countMinions = function()
            {
                var contMinions = 0;
                for(var i=0;i<this.minions.length;i++)
                {
                    contMinions += this.minions[i].countMinions() ;
                }

                return contMinions + this.minions.length;

            }

            // This mafia member go to jail, and need to change it's children .It's a little messy but you know... it works (I think)
            this.toJainMinion = function(minion)
            {
                var minionRemoved = null;
                for(var i=0;i<this.minions.length;i++)
                {
                    if(this.minions[i].name == minion)
                    {
                        minionRemoved = this.minions.splice(i,1)[0];
                        break;
                    }
                }

                if(minionRemoved != undefined)
                {

                    membersInJail.push(minionRemoved);
                    if(this.minions.length)
                    {
                        //console.log(this.minions[0]);

                        for(var i= 0;i<minionRemoved.minions.length;i++)
                        {
                            minionRemoved.minions[i].parent = this.minions[0];
                            this.minions[0].insertMinion(minionRemoved.minions[i]);


                        }

                        changeParentInJail(minionRemoved, this.minions[0])
                    }
                    else
                    {
                        var promotedMinion = minionRemoved.minions[0];

                        promotedMinion.parent = minionRemoved.parent;

                        minionRemoved.parent.insertMinion(promotedMinion);


                        for(var i= 1;i<minionRemoved.minions.length;i++)
                        {
                            minionRemoved.minions[i].parent = promotedMinion;
                            promotedMinion.insertMinion(minionRemoved.minions[i]);
                        }

                        changeParentInJail(minionRemoved, promotedMinion)
                    }





                }

            }


            // Remove minion by name
            this.removeMinion = function(minion)
            {

                for(var i=0;i<this.minions.length;i++)
                {
                    if(this.minions[i].name == minion)
                    {
                        minionRemoved = this.minions.splice(i,1)[0];
                        break;
                    }
                }


            }





            console.log("Creo ", this);

            members[name] = this;


        }


        var bossMember = new MafiaMember("Boss", 99, null);

        var ricardoMember = new MafiaMember("Ricardo", 55, "Boss");
        var JoseLuisMember = new MafiaMember("Jose Luis", 66, "Boss");


        var newMember = new MafiaMember("Juan Luis", 25, "Ricardo");
        var newMember = new MafiaMember("Jaime", 16, "Ricardo");

        var newMember = new MafiaMember("Chus", 55, "Jose Luis");
        var newMember = new MafiaMember("Conchi", 46, "Jose Luis");

        var newMember = new MafiaMember("Dani", 25, "Chus");
        var newMember = new MafiaMember("Cerra", 36, "Chus");


        // So you can check this. Or add. Please check the remove Boss (first element). It's a little tricky

        /*remove("Ricardo");

        recover("Ricardo");

        remove("Chus");

        remove("Jose Luis");

        recover("Chus");*/

        //remove("Boss");



        console.log(getMoreThan5());



        console.log(membersInJail);
        console.log(bossMember);




    }
)
;