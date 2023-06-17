const canvas_model = document.getElementById("ModelCanvas");
const ctx_model = canvas_model.getContext("2d");

var SelectedOptions = {
    "Body": 0,
    "Eyes": 0,
    "Mouth": 0,
    "Weapon": 0
}

var SelectedOptions_FilePath = {
    "Body": "",
    "Eyes": "",
    "Mouth": "",
    "Weapon": ""
}

CreateSelection_Main()
init_Img()

function init_Img(){
    ctx_model.clearRect(0, 0, canvas_model.width, canvas_model.height);
    LoadImage()
}

function LoadImg(){
    const Body_img = new Image();
    const Eyes_img = new Image();
    const Mouth_img = new Image();
    const Weapon_img = new Image();

    Body_img.src = (SelectionOptions.find(FindCategory => FindCategory.Category == "Body")).Options[SelectedOptions["Body"]].ImagePath
    Eyes_img.src = (SelectionOptions.find(FindCategory => FindCategory.Category == "Eyes")).Options[SelectedOptions["Eyes"]].ImagePath
    Mouth_img.src = (SelectionOptions.find(FindCategory => FindCategory.Category == "Mouth")).Options[SelectedOptions["Mouth"]].ImagePath
    Weapon_img.src = (SelectionOptions.find(FindCategory => FindCategory.Category == "Weapon")).Options[SelectedOptions["Weapon"]].ImagePath

    Body_img.onload = () => {
        ctx_model.drawImage(Body_img, 0, 0,canvas_model.width,canvas_model.height);
        ctx_model.drawImage(Eyes_img, 0, 0,canvas_model.width,canvas_model.height);
        ctx_model.drawImage(Mouth_img, 0, 0,canvas_model.width,canvas_model.height);
        ctx_model.drawImage(Weapon_img, 0, 0,canvas_model.width,canvas_model.height);
    };
}

function LoadImage(){

    Body_img_Path = (SelectionOptions.find(FindCategory => FindCategory.Category == "Body")).Options[SelectedOptions["Body"]].ImagePath
    Eyes_img_Path = (SelectionOptions.find(FindCategory => FindCategory.Category == "Eyes")).Options[SelectedOptions["Eyes"]].ImagePath
    Mouth_img_Path = (SelectionOptions.find(FindCategory => FindCategory.Category == "Mouth")).Options[SelectedOptions["Mouth"]].ImagePath
    Weapon_img_Path = (SelectionOptions.find(FindCategory => FindCategory.Category == "Weapon")).Options[SelectedOptions["Weapon"]].ImagePath

    var imageURL = [Body_img_Path,Eyes_img_Path,Mouth_img_Path,Weapon_img_Path];
    var imageObject = [];

    var imagesLoaded = 0;

    for(i=0;i<imageURL.length;i++){
        var img = new Image();
        img.onload = function(){
            imagesLoaded++;
            if (imagesLoaded== imageURL.length){
                ctx_model.drawImage(imageObject[0], 0, 0,canvas_model.width,canvas_model.height);
                ctx_model.drawImage(imageObject[1], 0, 0,canvas_model.width,canvas_model.height);
                ctx_model.drawImage(imageObject[2], 0, 0,canvas_model.width,canvas_model.height);
                ctx_model.drawImage(imageObject[3], 0, 0,canvas_model.width,canvas_model.height);
            }
        }
        img.src = imageURL[i];
        imageObject.push(img)

    }

}

function CreateSelection_Main(){
    SelectionOptions.forEach(function(eachCatergory){
        CreateSelection_Each(eachCatergory)
    })
    SwitchCategory($("#Eyes_Selection_Btn")[0])
}

function CreateSelection_Each(_options){

    var HTML_Switch = `<button id="`+_options.Category+`_Selection_Btn" data-category="`+_options.Category+`"
     onclick="SwitchCategory(this)" class="btn btn-outline-dark">`
    +_options.Category+`</button>`;

    var HTML_Selection = `<div id="`+_options.Category+`_Selection"></div>`;

    $("#Selection_Switch").append(HTML_Switch)
    $("#Selection_Container").append(HTML_Selection)

    var HTML_OptionBtn = "";
    _options.Options.forEach(function(eachOption, option_index){
        HTML_OptionBtn += `<button class="SelectionBtn" 
        style="background-image: url('`+eachOption.ImagePath+`');"  
        data-category="`+_options.Category+`" 
        data-index="`+option_index+`" 
        onclick="UpdateImg(this)"
        ></button>`
    })
    $("#"+_options.Category + "_Selection").append(HTML_OptionBtn)
   
}

function UpdateImg(_elem){
    var _caterory = $(_elem).data('category')
    var _NewVal = $(_elem).data('index')

    SelectedOptions[_caterory] = _NewVal
    
    init_Img()
}

function SwitchCategory(_elem){
    $("#Selection_Container>div").hide()
    $("#"+$(_elem).data("category")+"_Selection").show()

    $('#Selection_Switch>button').removeClass('btn-dark')
    $('#Selection_Switch>button').addClass('btn-outline-dark')
    $(_elem).removeClass('btn-outline-dark')
    $(_elem).addClass('btn-dark')
}

function SaveAsImg(){
    let downloadLink = document.createElement('a');
    downloadLink.setAttribute('download', '9696s.png');
    let dataURL = canvas_model.toDataURL('image/png');
    let url = dataURL.replace(/^data:image\/png/,'data:application/octet-stream');
    downloadLink.setAttribute('href', url);
    downloadLink.click();
}