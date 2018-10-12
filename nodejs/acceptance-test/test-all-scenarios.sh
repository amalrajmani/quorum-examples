#!/bin/bash
SNODEHOME=/home/vagrant/quorum-examples/examples/7nodes
ASHOME=/vagrant/nodejs/acceptance-test/

declare -a consensusList=("istanbul" "raft")
declare -a gcmodeList=("full" "archive")

for CONSEN in "${consensusList[@]}"
do
    for GCMODE in "${gcmodeList[@]}"
    do
        cd $SNODEHOME
        #stop network
        ./stop_all.sh
        #init network
        ./$CONSEN-init.sh
        #start network
        ./$CONSEN-start.sh $GCMODE

        RPTNAME=func_test_geth_1812_$CONSEN_$GCMODE.`date  +'%Y%m%d_%H%s'`.txt
        FNAME=$ASHOME/reports/$RPTNAME

        echo "started $CONSEN in gcmode=$GCMODE"

        #generate report header
        echo `date`, "started $CONSEN in gcmode=$GCMODE"                     > $FNAME
        echo "================"                                              >> $FNAME
        ps -eaf|grep geth |grep -v grep                                      >> $FNAME
        ps -eaf|grep tessera |grep -v grep                                   >> $FNAME
        echo `ps -eaf|grep geth |grep -v grep|wc -l`, ' geth nodes up'       >> $FNAME
        echo `ps -eaf|grep tessera |grep -v grep|wc -l`, ' tessera nodes up' >> $FNAME
        geth version                                                         >> $FNAME
        echo "================"                                              >> $FNAME
        #give time for first 20 blocks to get created
        sleep 10
        cd $SNODEHOME
        echo "geth stats before starting test cases..."                                             >> $FNAME
        geth --exec "loadScript('$SNODEHOME/totalTxn.js')" attach ipc:$SNODEHOME/qdata/dd1/geth.ipc >> $FNAME
        echo "================"                                                                     >> $FNAME
        echo "acceptance test started.."
        #run acceptance test
        cd $ASHOME
        mocha --timeout 80000 *_test.js                                                             >> $FNAME
        echo "acceptance test finished."
        cd $SNODEHOME
        echo "geth stats after completing test cases...."                                           >> $FNAME
        echo `ps -eaf|grep geth |grep -v grep|wc -l`, ' geth nodes up'                               >> $FNAME
        echo `ps -eaf|grep tessera |grep -v grep|wc -l`, ' tessera nodes up'                         >> $FNAME
        geth --exec "loadScript('$SNODEHOME/totalTxn.js')" attach ipc:$SNODEHOME/qdata/dd1/geth.ipc >> $FNAME
        echo "================"                                                                     >> $FNAME

        echo `date`, "automated testing completed"                                                  >> $FNAME

        ./stop_all.sh
        echo "stopped network to check block synching up"                                           >> $FNAME
        ./$CONSEN-start.sh $GCMODE
        echo "started network to check block synching up"                                           >> $FNAME
        sleep 5
        echo "sync test started.."
        echo "geth stats after restarting network..."                                               >> $FNAME
        echo `ps -eaf|grep geth |grep -v grep|wc -l`, ' geth nodes up'                              >> $FNAME
        echo `ps -eaf|grep tessera |grep -v grep|wc -l`, ' tessera nodes up'                        >> $FNAME
        geth --exec "loadScript('$SNODEHOME/totalTxn.js')" attach ipc:$SNODEHOME/qdata/dd1/geth.ipc >> $FNAME
        echo "================"                                                                     >> $FNAME

        geth --exec "loadScript('$SNODEHOME/sendTxns.js')" attach ipc:$SNODEHOME/qdata/dd1/geth.ipc >> $FNAME
        sleep 20
        echo "created some transactions after restarting network..."                                >> $FNAME
        echo "geth stats after restarting network and created some txns..."                         >> $FNAME
        echo `ps -eaf|grep geth |grep -v grep|wc -l`, ' geth nodes up'                              >> $FNAME
        echo `ps -eaf|grep tessera |grep -v grep|wc -l`, ' tessera nodes up'                        >> $FNAME
        geth --exec "loadScript('$SNODEHOME/totalTxn.js')" attach ipc:$SNODEHOME/qdata/dd1/geth.ipc >> $FNAME
        echo "================"                                                                     >> $FNAME
        echo `date`, "testing completed"                                                            >> $FNAME
        echo "sync test finished"
        echo "finished $CONSEN in gcmode=$GCMODE"                                                   >> $FNAME
    done

done





