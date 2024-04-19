class RevenuResponseDto {
    constructor({ departmentId, departmentName, mardi, mercredi, jeudi, vendredi, samedi, dimanche, sousTot, cumulat }) {
        this.departmentId = departmentId;
        this.departmentName = departmentName;
        this.mardi = mardi;
        this.mercredi = mercredi;
        this.jeudi = jeudi;
        this.vendredi = vendredi;
        this.samedi = samedi;
        this.dimanche = dimanche;
        this.sousTot = sousTot;
        this.cumulat = cumulat;
    }

}

module.exports = {
    RevenuResponseDto
}