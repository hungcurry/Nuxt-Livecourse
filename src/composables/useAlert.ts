export function useAlert() {
  const { $swal } = useNuxtApp()

  // 使用 sweetAlert2 套件顯示訊息
  // $swal.fire({
  //   position: "center",
  //   icon: ...,
  //   title: ...,
  //   showConfirmButton: false,
  //   timer: 1500,
  // });

  const alert = (icon: string, title: string) => {
    ($swal as any).fire({
      position: 'center',
      icon,
      title,
      showConfirmButton: false,
      timer: 1500,
    })
  }

  const successAlert = (title: string) => {
    alert('success', title)
  }

  const errorAlert = (title: string) => {
    alert('error', title)
  }

  return {
    alert,
    successAlert,
    errorAlert,
  }
}
