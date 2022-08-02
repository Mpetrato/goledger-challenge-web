import * as C from './styles'

export const EventPage = () => {
    return (
        <C.Container>
            <C.Table>
                <thead>
                    <tr>
                        <C.TableTh>Type</C.TableTh>
                        <C.TableTh>Model</C.TableTh>
                        <C.TableTh>Driver</C.TableTh>
                        <C.TableTh>Action</C.TableTh>
                    </tr>
                </thead>
                <tbody>
                    <C.TableTr >
                        <C.TableTd>dasdsa</C.TableTd>
                        <C.TableTd>asddsa</C.TableTd>
                        <C.TableTd>dsassda</C.TableTd>
                    </C.TableTr>
                </tbody>
            </C.Table>
            <button>Register a Car</button>
        </C.Container>
    )
}