/**
 * Created by alber_000 on 6/1/2016.
 */
var filter=require('./genericFilter');

function personFilter(req,res)
{
    var bindvariables= {
        case1:
        {
            p_id:req.body.p_id,
            tasks_completed_counter:req.body.tasks_completed_counter,
            date11:req.body.date11,
            date22:req.body.date22,
            page1: parseInt(req.body.page1),
            rowsToFetch1:parseInt(req.body.rowsToFetch1)
        },
        case2:
        {
            p_id:req.body.p_id,
            date11:req.body.date11,
            date22:req.body.date22,
            page1:parseInt(req.body.page1),
            rowsToFetch1:parseInt(req.body.rowsToFetch1)
        },
        case3:
        {
            tasks_completed_counter:req.body.tasks_completed_counter,
            page1:parseInt(req.body.page1),
            rowsToFetch1:parseInt(req.body.rowsToFetch1)
        },
        case4:
        {
            date11:req.body.date11,
            date22:req.body.date22,
            page1:parseInt(req.body.page1),
            rowsToFetch1:parseInt(req.body.rowsToFetch1)
        },
        case5:
        {
            p_id:req.body.p_id,
            page1:parseInt(req.body.page1),
            rowsToFetch1:parseInt(req.body.rowsToFetch1)
        },
        case6:
        {
            tasks_completed_counter:req.body.tasks_completed_counter,
            date11:req.body.date11,
            date22:req.body.date22,
            page1:parseInt(req.body.page1),
            rowsToFetch1:parseInt(req.body.rowsToFetch1)
        },
        case7:
        {
            page1:parseInt(req.body.page1),
            rowsToFetch1:parseInt(req.body.rowsToFetch1)
        }
    };



    //console.log(typeof bindvariables.case7.page);
   // console.log(bindvariables.case7.page1);
  //  console.log(req.body.page);
   // console.log(req.body.rowsToFetch1);
 //   console.log(bindvariables.case7.rowsToFetch);
 //   console.log(typeof bindvariables.case7.rowsToFetch);

   // console.log(req.body.p_id);
  //  console.log(req.body.date11);

    var select=[];
    if(req.body.p_id!='' && req.body.tasks_completed_counter!='' && req.body.date11!='' && req.body.date22!='')
    {
        select.push("SELECT p_id, tasks_completed_counter, tasks_attempted_counter, completeddate, hassolution,solution FROM " +
            "(SELECT p_id, tasks_completed_counter, tasks_attempted_counter, completeddate, hassolution,solution,ROWNUM RN " +
            "FROM (SELECT p_id, tasks_completed_counter, tasks_attempted_counter, completeddate, hassolution,solution" +
            " FROM personView where p_id= :p_id and tasks_completed_counter> :tasks_completed_counter and " +
            "TRUNC(completeddate) between :date11 and :date22 ORDER BY P_ID ASC)" +
            " where ROWNUM<=:page1*:rowsToFetch1) WHERE RN>(:page1-1)*:rowsToFetch1");
        filter.filterBy(req,res,select[0],bindvariables.case1);
    }
    else if(req.body.p_id!='' && req.body.tasks_completed_counter=='' && req.body.date11!='' && req.body.date22!='')
    {
        select.push("SELECT p_id, tasks_completed_counter, tasks_attempted_counter, completeddate, hassolution,solution FROM" +
            "(SELECT p_id, tasks_completed_counter, tasks_attempted_counter, completeddate, hassolution,solution," +
            "ROWNUM RN FROM(SELECT p_id, tasks_completed_counter, tasks_attempted_counter, completeddate, hassolution,solution" +
            " FROM personView where p_id= :p_id and " +
            "TRUNC(completeddate) between :date11 and :date22 ORDER BY P_ID ASC)" +
            " where ROWNUM<=:page1*:rowsToFetch1) WHERE RN>(:page1-1)*:rowsToFetch1");
        filter.filterBy(req,res,select[0],bindvariables.case2);
    }
    else if(req.body.p_id=='' && req.body.tasks_completed_counter!='' && req.body.date11=='' && req.body.date22=='')
    {
        select.push("SELECT p_id, tasks_completed_counter, tasks_attempted_counter, completeddate, hassolution,solution FROM" +
            "(SELECT p_id, tasks_completed_counter, tasks_attempted_counter, completeddate, hassolution,solution,ROWNUM RN FROM(SELECT p_id, tasks_completed_counter, " +
            "tasks_attempted_counter, completeddate, hassolution,solution" +
            " FROM personView where tasks_completed_counter> :tasks_completed_counter ORDER BY P_ID ASC) where ROWNUM<=:page1*:rowsToFetch1) WHERE RN>(:page1-1)*:rowsToFetch1");
        filter.filterBy(req,res,select[0],bindvariables.case3);
    }
   // else if(req.body.p_id=='' && req.body.tasks_completed_counter=='' && req.body.date11=='' && req.body.date22=='')
 //   {
 //       select.push("SELECT p_id, tasks_completed_counter, tasks_attempted_counter, completeddate, hassolution,solution " +
 //           "FROM(SELECT p_id, tasks_completed_counter, tasks_attempted_counter, completeddate, hassolution,solution,ROWNUM RN " +
  //          "FROM(SELECT p_id, tasks_completed_counter, tasks_attempted_counter, completeddate, hassolution,solution FROM personView " +
 //           "ORDER BY P_ID ASC) WHERE ROWNUM<=:page1*:rowsToFetch1) WHERE RN>(:page1-1)*:rowsToFetch1");
  //      filter.filterBy(req, res, select[0], bindvariables.case7);
  //  }
    else if(req.body.p_id=='' && req.body.tasks_completed_counter=='' && req.body.date11!='' && req.body.date22!='')
    {
        select.push("SELECT p_id, tasks_completed_counter, tasks_attempted_counter, completeddate, hassolution,solution FROM" +
            "(SELECT p_id, tasks_completed_counter, tasks_attempted_counter, completeddate, hassolution,solution,ROWNUM RN " +
            "FROM(SELECT p_id, tasks_completed_counter, tasks_attempted_counter, completeddate, hassolution,solution" +
            " FROM personView where TRUNC(completeddate) between :date11 and :date22 ORDER BY P_ID ASC) " +
            " where ROWNUM<=:page1*:rowsToFetch1) WHERE RN>(:page1-1)*:rowsToFetch1");
        filter.filterBy(req,res,select[0],bindvariables.case4);
    }
    else if(req.body.p_id!='' && req.body.tasks_completed_counter=='' && req.body.date11=='' && req.body.date22=='')
    {
        select.push("SELECT p_id, tasks_completed_counter, tasks_attempted_counter, completeddate, hassolution,solution FROM (SELECT p_id, tasks_completed_counter, " +
            "tasks_attempted_counter, completeddate, hassolution,solution,ROWNUM RN FROM(select p_id, tasks_completed_counter, tasks_attempted_counter, completeddate, " +
            "hassolution,solution from personView where p_id= :p_id ORDER BY P_ID ASC) " +
            "where ROWNUM<=:page1*:rowsToFetch1) WHERE RN>(:page1-1)*:rowsToFetch1");
        filter.filterBy(req,res,select[0],bindvariables.case5);
    }
    else if(req.body.p_id=='' && req.body.tasks_completed_counter!='' && req.body.date11!='' && req.body.date22!='')
    {
        select.push("SELECT p_id, tasks_completed_counter, tasks_attempted_counter, completeddate, hassolution,solution FROM " +
            "(SELECT p_id, tasks_completed_counter, tasks_attempted_counter, completeddate, hassolution,solution,ROWNUM RN " +
            "FROM (SELECT p_id, tasks_completed_counter, tasks_attempted_counter, completeddate, hassolution,solution" +
            " FROM personView where tasks_completed_counter> :tasks_completed_counter and " +
            "TRUNC(completeddate) between :date11 and :date22 ORDER BY P_ID ASC)" +
            " where ROWNUM<=:page1*:rowsToFetch1) WHERE RN>(:page1-1)*:rowsToFetch1");
        filter.filterBy(req,res,select[0],bindvariables.case6);
    }
    else
    {
        res.send("error"); // TODO : handle exception properly
        console.log("try inputting again");
    }
}



module.exports=personFilter;