'use strict';

var entryFactory = require('../../../factory/EntryFactory'),
        is = require('bpmn-js/lib/util/ModelUtil').is,
        getBusinessObject = require('bpmn-js/lib/util/ModelUtil').getBusinessObject,
        iniObjectString = '',
        crudTypeString = '';


module.exports = function (group, element) {

    var bo = getBusinessObject(element);

    if (!bo) {
        return;
    }

    if (is(element, 'camunda:Initiator') && !is(element.parent, 'bpmn:SubProcess')) {
        group.entries.push(entryFactory.textField({
            id: 'initiator',
            label: 'Initiator',
            modelProperty: 'initiator'
        }));

        group.entries.push(entryFactory.selectBox({
            id: 'initiator_object',
            label: 'Initiator_object',
            selectOptions: [
                {name: 'Gebruiker', value: 'Gebruiker'},
                {name: 'Inschrijving', value: 'Inschrijving'}
            ],
            modelProperty: 'initiator_object',
            emptyParameter: false
        }));

        group.entries.push(entryFactory.selectBox({
            id: 'Crud-type',
            label: 'Crud-type',
            selectOptions: [
                {name: 'Create', value: 'Create'},
                {name: 'Update', value: 'Update'},
                {name: 'Delete', value: 'value'}
            ],
            modelProperty: 'initiatorcrud',
            emptyParameter: false
        }));
        window.onload = function () {
            var iniObject = document.getElementById("initiator_object");
            iniObject.addEventListener("change", function () {
                iniObjectString = iniObject.value;
                document.getElementById("camunda-initiator").value = iniObjectString + '' + crudTypeString;
            });
            
            var crudType = document.getElementById("Crud-type");
            crudType.addEventListener("change", function () {
                crudTypeString = crudType.value;
                document.getElementById("camunda-initiator").value = iniObjectString + '' + crudTypeString;
            });
        }

//        $(document).ready(function () {
//            $(document).on("change", "select[id^='Crud-type']", function () {
//                crudTypeString = ($(this).val());
//                document.getElementById("initiatior").value = iniObjectString + '-' + crudTypeString;
//            });
//        });
    }
};
