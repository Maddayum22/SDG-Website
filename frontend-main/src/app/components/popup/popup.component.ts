/**
 * @author Sven Molenaar
 * Dynamic popup component code
 * Guide to use it is located at the bottom of the page.
 */
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css'],
})

export class PopupComponent {
  /**
   * Constructs the data object which is used to fill the popup content.
   * @param dialogRef Reference to a dialog opened via the MatDialog service.
   * @param data  an collection of an data obtject
   */
  constructor(
    public dialogRef: MatDialogRef<PopupComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      message: string;
      messageColor?: string;
      backgroundColor?: string;
    }
  ) { }

  /**
     * Gets the rgb value from the data object,and fills the color property of the background of the content element.
     * if there was not any color specified, it returns empty
     * @returns the color and background style which the background will use.
     * @returns nothing if the data.backgroundrColor was empty 
     */
  getBackgroundStyle() {
    if (this.data.backgroundColor) {
      return {'background-color':  `${this.data.backgroundColor}` };
    }
    return {};
  }
  /**
     * Gets the rgb value from the data object,and fills the color property of message element.
     * if there was not any color specified, it returns empty
     * @returns the color which the message element will use
     * @returns nothing if the data.messageColor was empty 
     */
  getMessageStyle() {
    if (this.data.messageColor) {
      return { color: this.data.messageColor };
    }
    return {};
  }
}







/**
 * @author Sven Molenaar
 * How to use the popup Component for yourself:
  Step 1:  add to own component
      import { PopupComponent } from '../popup/popup.component';
      import { MatDialog } from '@angular/material/dialog';

   Step 2:  add to constructor
      public dialog: MatDialog,
 
  Step 3: in your code, you call the popup by using:
  let dialogRef =this.dialog.open(PopupComponent, {

  Step 4: Define the data you want to be displayed (the colors are custimisable by using RGB values)
          data: {
            message: 'Succesfully logged in',
            messageColor: 'rgb(0, 255, 0)', // optional message color property
            borderColor: 'rgb(0, 255, 0)', // optional border color property
          },

  Step 5: add the default popup style class
          panelClass: 'popup-container',
        });

  Step 6: for self closing popups, use an timeout with an closing statement for the dialogRef and time
        setTimeout(() => {
          dialogRef.close();
        }, 2000);
  
        },
      },



      FULL EXAMPLE for error handling:
      (error) => {
        let dialogRef = this.dialog.open(PopupComponent, {
          data: {
            message: 'Wrong email or password!',
            messageColor: 'rgb(255, 0, 0)', // optional message color property
            borderColor: 'rgb(255, 0, 0)', // optional border color property
          },
          panelClass: 'popup-container',
        });
        setTimeout(() => {
          dialogRef.close();
        }, 2000);
      }

      FULL EXAMPLE for succes handling:
      (response) => {
        let dialogRef = this.dialog.open(PopupComponent, {
          data: {
            message: 'Succesfully logged in',
            messageColor: 'rgb(0, 255, 0)', // optional message color property
            borderColor: 'rgb(0, 255, 0)', // optional border color property
          },
          panelClass: 'popup-container',
        });
        setTimeout(() => {
          dialogRef.close();
          this.router.navigate(['/']);
        }, 4000);
      },
*/
