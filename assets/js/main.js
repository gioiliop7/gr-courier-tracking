$(document).ready(function ($) {
  function tracking_number_search() {
    let value = $("#t-number").val();
    if (value) {
      var settings = {
        url: "https://eltrak.devdd.xyz/v2/track-all/" + value,
        method: "GET",
        timeout: 0,
      };

      function translateSkroutz(status) {
        switch (status) {
          case "Failed to pickup":
            status =
              "Αποτυχία παραλαβής από το κατάστημα ή απο το κέντρο διαλογής του Skroutz";
            break;
          case "Shipment was picked up":
            status =
              "Επιτυχής παραλαβή από το κατάστημα ή απο το κέντρο διαλογής του Skroutz";
            break;
          case "Waiting For Pickup":
            status =
              "Αναμονή παραλαβής από το κατάστημα ή απο το κέντρο διαλογής του Skroutz";
            break;
          case "Shipment was assigned to courier for_delivery":
            status = "Έναρξη παράδοσης";
            break;
          case "Shipment was not delivered":
            status = "Αποτυχία παράδοσης";
            break;
          case "Shipment was delivered":
            status = "Επιτυχής παράδοση";
            break;
          default:
            break;
        }
        return status;
      }

      $.ajax(settings)
        .done(function (response) {
          console.log(response);
          let found = response.found;
          if (found == true) {
            let courier_name = response.courier;
            let tracking_number = response.tracking_number;
            let responses = response.updates;
            let delivered = response.delivered;
            let last_update = response.last;
            let last_update_status = last_update.status;
            last_update_status = translateSkroutz(last_update_status);
            let space = last_update.space;
            let time = last_update.time;
            if (found == true) {
              if (!space == "") {
                $(".lu").html(
                  "<br><span class='font-weight-bold'>Κατάσταση</span>: " +
                    last_update_status +
                    "<br> <span class='font-weight-bold'>Ημερομηνία</span>: " +
                    time +
                    "<br><span class='font-weight-bold'>Τοποθεσία</span>: " +
                    space
                );
              } else {
                $(".lu").html(
                  "<br>Κατάσταση: " +
                    last_update_status +
                    "<br> Ημερομηνία: " +
                    time
                );
              }
              $(".id-number").text(tracking_number);
              if (delivered == true) {
                $(".status").text("Παραδόθηκε").css("color", "green");
              } else {
                $(".status").text("Προς παράδοση").css("color", "red");
              }
              $(".lu").text();
              switch (courier_name) {
                case "Speedex":
                  $(".courier-logo").attr("src", "./assets/img/speedex.png");
                  break;
                case "ELTA Courier":
                  $(".courier-logo").attr("src", "./assets/img/elta.jpg");
                  break;
                case "ACS":
                  $(".courier-logo").attr("src", "./assets/img/acs.svg");
                  break;
                case "Skroutz Last Mile":
                  $(".courier-logo").attr("src", "./assets/img/skroutz.svg");
                  break;
                case "Geniki":
                  $(".courier-logo").attr("src", "./assets/img/geniki.jpg");
                  break;
                case "EasyMail":
                  $(".courier-logo").attr("src", "./assets/img/easymail.jpg");
                  break;
              }
              let i = 0;
              let len = responses.length;
              $(".updates-table tbody").empty();
              for (i = 0; i < len; i++) {
                let responses_time = responses[i].time;
                let responses_status = responses[i].status;
                responses_status = translateSkroutz(responses_status);
                let resposnes_space = responses[i].space;
                const html_code = `<tr>
            <td>${responses_status}</td>
            <td>${resposnes_space}</td>
            <td>${responses_time}</td>
            </tr>`;
                $(".updates-table tbody").append(html_code);
              }
              $(".result-items").show();
              $("#the-result").show();
              $(".problem-text").remove();
            }
          } else {
            $(".result-items").hide();
            $(".problem-text").remove();
            $("#the-result")
              .append(
                '<h2 class="problem-text text-center pt-5 pb-5"> Δεν υπάρχει ο αριθμός αποστολής</h2>'
              )
              .show();
          }
        })
        .fail(function (response) {
          $(".result-items").hide();
          $(".problem-text").remove();
          $("#the-result")
            .append(
              '<h2 class="problem-text text-center pt-5 pb-5"> Παρουσιάστηκε κάποιο πρόβλημα, παρακαλώ προσπαθήστε ξανά</h2>'
            )
            .show();
        });
    } else {
      alert("Παρακαλώ μην αφήνετε κενό το πεδίο");
    }
  }
  $("#submit-search").click(function () {
    tracking_number_search();
  });

  let year = new Date().getFullYear();
  $(".year").text(year);
});
