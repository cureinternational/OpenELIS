var OpenElis = OpenElis || {}
OpenElis.Utils = {
    calculateAge: function(DOB, datePattern) {
        var date = new String(DOB);
        var splitPattern = datePattern.split("/");
        var dayIndex = 0;
        var monthIndex = 1;
        var yearIndex = 2;

        for (var i = 0; i < 3; i++) {
            if (splitPattern[i] == "DD") {
                dayIndex = i;
            } else if (splitPattern[i] == "MM") {
                monthIndex = i;
            } else if (splitPattern[i] == "YYYY") {
                yearIndex = i;
            }
        }

        var splitDOB = date.split("/");
        var monthDOB = splitDOB[monthIndex];
        var dayDOB = splitDOB[dayIndex];
        var yearDOB = splitDOB[yearIndex];

        if (!monthDOB || !dayDOB || !yearDOB ||
            !monthDOB.match(/^\d+$/) || !dayDOB.match(/^\d+$/) || !yearDOB.match(/^\d+$/)) {
            return DOB;
        }

        var dob = new Date(yearDOB, monthDOB - 1, dayDOB);
        var today = new Date();

        var isRealCalendarDate = dob.getFullYear() == yearDOB &&
            dob.getMonth() == monthDOB - 1 &&
            dob.getDate() == dayDOB;

        if (isNaN(dob.getTime()) || !isRealCalendarDate || dob > today) {
            return DOB;
        }

        var years = today.getFullYear() - dob.getFullYear();
        var months = today.getMonth() - dob.getMonth();
        var days = today.getDate() - dob.getDate();

        if (days < 0) {
            months--;
            var daysInPreviousMonth = new Date(today.getFullYear(), today.getMonth(), 0).getDate();
            days += daysInPreviousMonth;
        }

        if (months < 0) {
            years--;
            months += 12;
        }

        return years + " years " + months + " months " + days + " days";
    },

    getXMLValue: function(response, key){
        var field = response.getElementsByTagName(key).item(0);
        return field != null ? field.firstChild.nodeValue : "";
    },

    getTime: function (time) {

        time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

        if (time.length > 1) { // If time format correct
            time = time.slice(1); // Remove full string match value
            time[5] = +time[0] < 12 ? 'AM' : 'PM'; // Set AM/PM
            time[0] = +time[0] % 12 || 12; // Adjust hours
        }
        return time.join(''); // return adjusted time or original string
    }

}
