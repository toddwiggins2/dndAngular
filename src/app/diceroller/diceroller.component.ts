import { Component, OnInit, Input, ViewChild, Output } from '@angular/core';
// import { Dice } from '../dice';
import { NgModule } from '@angular/core';
// import { D20Array } from '../dice';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import { HtmlParser } from '@angular/compiler';
import { FormControl } from '@angular/forms';
import { MatTable } from '@angular/material/table';
import { MatTableModule } from '@angular/material/table';

export interface AttackArray {
  ID: number;
  FirstD20: number;
  SecondD20: number;
  FinalD20: number;
  damageDie: number;
  numberofAttacks: number;
  damageBonus: number;
  plusToHit: number;
  totalPlustoHit: number;
  damageTotal: number;
  bless: number;
  bane: number;
  allDiceObjects: string;
  brutalCritical: number;
}

const DICE_ARRAY: AttackArray[] = [
  {
    ID: 1,
    FirstD20: 10,
    SecondD20: 20,
    FinalD20: 20,
    damageDie: 6,
    numberofAttacks: 3,
    damageBonus: 5,
    plusToHit: 8,
    totalPlustoHit: 5,
    damageTotal: 0,
    bless: 0,
    bane: 0,
    allDiceObjects: '0',
    brutalCritical: 0,
  },
];

@Component({
  selector: 'app-diceroller',
  templateUrl: './diceroller.component.html',
  styleUrls: ['./diceroller.component.scss'],
})
export class DicerollerComponent implements OnInit {
  // DataSource interface for Frontend Table:
  displayedColumns: string[] = [
    'ID',
    // 'First D20',
    // 'Second D20',
    'Final D20',
    'Damage Die',
    // 'Number of Attacks',
    'Damage Bonus',
    'Plus to Hit',
    'Total Plus to Hit',
    'Damage Total',
    'Delete',
  ];

  dataSource = DICE_ARRAY;

  // Slide out Nav Bar
  mode = new FormControl('side');

  // D20 rolles outcomes:
  valueD20: number;
  valueD20Advantage: string;

  // On keypress variable (not needed)
  values = 4;

  // Basic Variables for Damage rolls:
  bonusHitValueHTML = 9;
  bonusDamageValueHTML = 6;
  numberofAttacksHTML = 4;
  totalAllDamage = 0;
  dieNumberHTML = 1;
  dieTypeHTML = 6;

  // Bonus Rage Damage for Barb:
  bonusRageDamageValueHTML = 2;
  brutalCriticalHTML = 0;

  // Extra Factors for rolling to Hit (Buffs and DeBuffs)
  checkBless = false;
  checkBane = false;

  returnDamagePlusMod: number;
  arrayOfDamageDie = [];

  constructor() {
    this.multipleAttacks('advantage');
  }

  onKey(value: number) {
    this.values += value; // + ' | ';
  }

  onDel = (row) => {
    // this.dataSource3.pop();
    const index = this.dataSource.indexOf(row, 0);
    if (index > -1) {
      this.dataSource.splice(index, 1);
    }
    this.dataSource = [...this.dataSource];
    this.totalAllDamage = this.getTotalDamage();
  };

  getTotalDamage() {
    return this.dataSource
      .map((t) => t.damageTotal)
      .reduce((acc, value) => acc + value, 0);
  }

  // *********************************
  // **       Test Button **
  // *********************************

  testButton() {
    const baneValue = this.checkBane ? Math.floor(Math.random() * 4) + 1 : 0;
    const blessValue = this.checkBless ? Math.floor(Math.random() * 4) + 1 : 0;

    console.log(`Bane: ${baneValue} Bless: ${blessValue}`);
    console.log(`${this.brutalCriticalHTML}`);
  }

  // *********************************
  // ** Roll D20 Die with Advantage **
  // *********************************
  getRoll20Advantage(rollWith: string) {
    let firstRoll = 0;
    let secondRoll = 0;
    let finalRoll = 0;
    let returnString: string;
    firstRoll = Math.floor(Math.random() * 20) + 1;
    secondRoll = Math.floor(Math.random() * 20) + 1;

    // Roll with Advantage
    if (rollWith === 'advantage') {
      if (firstRoll >= secondRoll) {
        finalRoll = firstRoll;
      } else {
        finalRoll = secondRoll;
      }
      // console.log('D20 First Roll ' + firstRoll + '\n' + 'D20 Second Roll ' + secondRoll + '\n' + finalRoll);
      returnString = `Final Roll: ${finalRoll} --- First Dice: ${firstRoll} Second Dice: ${secondRoll}`;
      this.valueD20Advantage = returnString;
      // this.d20advantageNumber = [firstRoll, secondRoll, finalRoll];
      return [firstRoll, secondRoll, finalRoll];
      // return returnString;
    }
    // Roll Regular (one die)
    else if (rollWith === 'notAdvantage') {
      // console.log(
      //   `first roll: ${firstRoll} second roll: 0 final roll: ${firstRoll}`
      // );
      this.valueD20 = firstRoll;
      return [firstRoll, 0, firstRoll];
    }
    // Roll with Disadvantage
    else if (rollWith === 'disAdvantage') {
      if (firstRoll <= secondRoll) {
        finalRoll = firstRoll;
      } else {
        finalRoll = secondRoll;
      }
      // console.log(
      //   `first roll: ${firstRoll} second roll: 0 final roll: ${firstRoll}`
      // );
      // this.valueD20 = finalRoll;
      return [firstRoll, secondRoll, finalRoll];
    }
  }

  // ***************************
  // ** Method for Normal D20 **
  // ***************************
  getRoll20() {
    let finalRoll = 0;
    finalRoll = Math.floor(Math.random() * 20) + 1;
    // console.log('D20 Final Roll ' + finalRoll);
    this.valueD20 = finalRoll;
    return finalRoll;
  }

  // ***********************************
  // ** Method for Rolling Damage Die **
  // ***********************************

  getDamage(/* numberOfDie, dieType */) {
    const numberOfDie = this.dieNumberHTML;
    const dieType = this.dieTypeHTML;

    let rValueDamage = 0;
    let finalrValue = 0;
    // this.arrayOfDamageDie.length = 0;

    for (let index = 0; index < Number(numberOfDie); index++) {
      // console.log('Final Value Loop: ' + finalrValue);
      rValueDamage = Math.floor(Math.random() * dieType) + 1;
      finalrValue = finalrValue + rValueDamage;
      this.arrayOfDamageDie[this.arrayOfDamageDie.length] = ` Die ${
        index + 1
      }: ${rValueDamage}`; // + ' ' + rValueDamage;
      // console.log('Die Roll: ' + rValueDamage);
      // console.log('Final Value Loop: ' + finalrValue);
    }
    this.returnDamagePlusMod =
      finalrValue + this.bonusDamageValueHTML + this.bonusRageDamageValueHTML;

    console.log('test array from getDamage function: ' + this.arrayOfDamageDie);

    // console.log(numberOfDie + 'd' + dieType + ' Result: ' + finalrValue);

    return finalrValue;
  }

  // *********************************
  // ** Method for Multiple Attacks **
  // *********************************
  multipleAttacks(rollsWith: string) {
    // this.getRoll20Advantage();
    while (this.dataSource.length > 0) {
      // this.d20Array.pop();
      this.dataSource.pop();
    }
    let diceTotal = 0;
    let brutalCriticalValue = 0;
    this.totalAllDamage = 0;

    for (let index = 0; index < this.numberofAttacksHTML; index++) {
      // Get just Dice roll for Damage:
      const firstDice = this.getDamage();

      // Roll a d20 with adv. and store three values:
      if (rollsWith === 'advantage') {
        // tslint:disable-next-line: no-var-keyword
        var [
          resultFirstD20,
          resultSecondD20,
          resultFinalD20,
        ] = this.getRoll20Advantage('advantage'); // this.d20advantageNumber;
      } else if (rollsWith === 'notAdvantage') {
        // tslint:disable-next-line: no-var-keyword
        var [
          resultFirstD20,
          resultSecondD20,
          resultFinalD20,
        ] = this.getRoll20Advantage('notAdvantage'); // this.d20advantageNumber;
      } else if (rollsWith === 'disAdvantage') {
        // tslint:disable-next-line: no-var-keyword
        var [
          // tslint:disable-next-line: prefer-const
          resultFirstD20,
          // tslint:disable-next-line: prefer-const
          resultSecondD20,
          // tslint:disable-next-line: prefer-const
          resultFinalD20,
        ] = this.getRoll20Advantage('disAdvantage'); // this.d20advantageNumber;
      }

      if (resultFinalD20 === 20) {
        // Natural 20 Crit:
        const secondDice = this.getDamage();
        brutalCriticalValue = Math.floor(Math.random() * 4) + 1;
        diceTotal =
          firstDice +
          secondDice +
          this.bonusDamageValueHTML +
          this.bonusRageDamageValueHTML;
        // console.log('Dice Total test: First Dice ' + firstDice + 'Second Dice: ' + secondDice +
        // 'Total: ' + diceTotal);
      } else if (resultFinalD20 === 1) {
        // Natural Miss:
        diceTotal = 0;
        // console.log('Natural 1: ' + diceTotal);
      } else {
        // Normal Dice Roll no Miss or Crit:
        diceTotal =
          firstDice + this.bonusDamageValueHTML + this.bonusRageDamageValueHTML;
      }

      // Bless and Bane Values
      const baneValue = this.checkBane ? Math.floor(Math.random() * 4) + 1 : 0;
      const blessValue = this.checkBless
        ? Math.floor(Math.random() * 4) + 1
        : 0;

      // Variable of Damage Output:
      const newItem = {
        ID: index,
        FirstD20: resultFirstD20,
        SecondD20: resultSecondD20,
        FinalD20: resultFinalD20,
        damageDie: firstDice, // this.getDamage(),
        numberofAttacks: this.numberofAttacksHTML,
        damageBonus: this.bonusDamageValueHTML,
        plusToHit: this.bonusHitValueHTML,
        totalPlustoHit: resultFinalD20 + this.bonusHitValueHTML,
        damageTotal: diceTotal, // this.returnDamagePlusMod,
        bless: blessValue,
        bane: baneValue,
        allDiceObjects: this.arrayOfDamageDie.join(', '),
        brutalCritical: brutalCriticalValue,
      };
      // Push new Values into Interface and update Datasource.
      this.dataSource.push(newItem);
      this.dataSource = [...this.dataSource];

      // All of the Damage from every Loop:
      this.totalAllDamage = this.totalAllDamage + diceTotal;
      this.arrayOfDamageDie.length = 0;
    }

    console.log(this.dataSource);
    // console.log('All Damage: ' + this.totalAllDamage);
    // console.log(d20Array.FirstD20);
  }

  ngOnInit(): void {}
}
